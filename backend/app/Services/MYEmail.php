<?php

namespace App\Services;

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

class MYEmail
{
    protected PHPMailer $mailer;
    protected string $fromEmail;
    protected string $fromName;
    protected array $to = [];
    protected array $cc = [];
    protected array $bcc = [];
    protected string $subject = '';
    protected string $htmlBody = '';
    protected string $textBody = '';
    protected array $attachments = [];
    protected string $devRecipient;

    public function __construct()
    {
        $this->mailer = new PHPMailer(true);
        $this->configureMailer();

        $this->fromEmail = env('MAIL_FROM_ADDRESS');
        $this->fromName = env('MAIL_FROM_NAME');
        $this->devRecipient = env('MAIL_DEV_RECIPIENT');
    }

    protected function configureMailer(): void
    {
        $this->mailer->isSMTP();
        $this->mailer->Host = env('MAIL_HOST');
        $this->mailer->SMTPAuth = true;
        $this->mailer->Username = env('MAIL_USERNAME');
        $this->mailer->Password = env('MAIL_PASSWORD');
        $this->mailer->SMTPSecure = env('MAIL_ENCRYPTION');
        $this->mailer->Port = env('MAIL_PORT');
    }

    public function from(string $email, string $name = ''): self
    {
        $this->fromEmail = $email;
        $this->fromName = $name;
        return $this;
    }

    public function to(string $email, string $name = ''): self
    {
        $this->to[] = ['email' => $email, 'name' => $name];
        return $this;
    }

    public function cc(string $email, string $name = ''): self
    {
        $this->cc[] = ['email' => $email, 'name' => $name];
        return $this;
    }

    public function bcc(string $email, string $name = ''): self
    {
        $this->bcc[] = ['email' => $email, 'name' => $name];
        return $this;
    }

    public function subject(string $subject): self
    {
        // Append environment info to subject in non-production
        if (env('APP_ENV') !== 'production') {
            $this->subject = '[' . strtoupper(env('APP_ENV')) . '] ' . $subject;
        } else {
            $this->subject = $subject;
        }
        return $this;
    }

    public function html(string $html): self
    {
        $this->htmlBody = $html;
        return $this;
    }

    public function text(string $text): self
    {
        $this->textBody = $text;
        return $this;
    }

    public function attach(string $path, string $name = ''): self
    {
        $this->attachments[] = ['path' => $path, 'name' => $name];
        return $this;
    }

    public function send(): bool
    {
        try {
            // Set from address
            $this->mailer->setFrom($this->fromEmail, $this->fromName);

            // Handle recipients based on environment
            if (env('APP_ENV') === 'production') {
                // Production - send to actual recipients
                foreach ($this->to as $recipient) {
                    $this->mailer->addAddress($recipient['email'], $recipient['name']);
                }
                foreach ($this->cc as $recipient) {
                    $this->mailer->addCC($recipient['email'], $recipient['name']);
                }
                foreach ($this->bcc as $recipient) {
                    $this->mailer->addBCC($recipient['email'], $recipient['name']);
                }
            } else {
                // Non-production - send only to dev recipient
                $this->mailer->clearAddresses();
                $this->mailer->clearCCs();
                $this->mailer->clearBCCs();
                $this->mailer->addAddress($this->devRecipient);

                // Modify the body to show original recipients
                $originalRecipients = $this->getOriginalRecipientsList();
                $this->htmlBody = $this->htmlBody . $originalRecipients;
                $this->textBody = $this->textBody . strip_tags($originalRecipients);
            }

            // Add attachments (always attach, regardless of environment)
            foreach ($this->attachments as $attachment) {
                $this->mailer->addAttachment(
                    $attachment['path'],
                    $attachment['name']
                );
            }

            // Content
            $this->mailer->isHTML(true);
            $this->mailer->Subject = $this->subject;
            $this->mailer->Body = $this->htmlBody;
            $this->mailer->AltBody = $this->textBody;

            $this->mailer->send();
            return true;

        } catch (Exception $e) {
            logger()->error('Email sending failed: ' . $this->mailer->ErrorInfo);
            return false;
        }
    }

    protected function getOriginalRecipientsList(): string
    {
        $recipients = '<div style="margin-top: 20px; padding: 10px; background: #f0f0f0; border: 1px dashed #ccc;">';
        $recipients .= '<h4>Original Recipients (Not actually sent in ' . env('APP_ENV') . ' environment):</h4>';
        $recipients .= '<p><strong>To:</strong> ' . $this->formatRecipients($this->to) . '</p>';

        if (!empty($this->cc)) {
            $recipients .= '<p><strong>CC:</strong> ' . $this->formatRecipients($this->cc) . '</p>';
        }

        if (!empty($this->bcc)) {
            $recipients .= '<p><strong>BCC:</strong> ' . $this->formatRecipients($this->bcc) . '</p>';
        }

        $recipients .= '</div>';

        return $recipients;
    }

    protected function formatRecipients(array $recipients): string
    {
        return implode(', ', array_map(function ($r) {
            return $r['name'] ? "{$r['name']} <{$r['email']}>" : $r['email'];
        }, $recipients));
    }

    public static function template(string $view, array $data = []): string
    {
        return view('emails.' . $view, $data)->render();
    }
    public function sendTemplate(
        string $view,
        array $data = [],
        array $options = []
    ): bool {
        // Set subject if provided in options
        if (isset($options['subject'])) {
            $this->subject($options['subject']);
        }

        // Render the template
        $html = view('emails.' . $view, $data)->render();
        $this->html($html);

        // Set text version if provided
        if (isset($options['text'])) {
            $this->text($options['text']);
        } else {
            // Auto-generate text version if not provided
            $this->text(strip_tags($html));
        }

        return $this->send();
    }
}
