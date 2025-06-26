<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

/**
 * Class EmailService
 * A robust, convenient email sending service using PHPMailer.
 */
class EmailService {

    protected PHPMailer $mailer;

    protected string $fromEmail;

    protected string $fromName;

    /** @var array<int, array{email: string, name: string}> */
    protected array $to = [];

    /** @var array<int, array{email: string, name: string}> */
    protected array $cc = [];

    /** @var array<int, array{email: string, name: string}> */
    protected array $bcc = [];

    protected string $subject = '';

    protected string $htmlBody = '';

    protected string $textBody = '';

    /** @var array<int, array{path: string, name: string}> */
    protected array $attachments = [];

    protected string $devRecipient;

    public function __construct() {
        $this->mailer = new PHPMailer(true);
        $this->configureMailer();
        $this->fromEmail = env('MAIL_FROM_ADDRESS', 'no-reply@example.com');
        $this->fromName = env('MAIL_FROM_NAME', 'No Reply');
        $this->devRecipient = env('MAIL_DEV_RECIPIENT', 'developer@example.com');
        // Additional PHPMailer config for best compatibility
        $this->mailer->CharSet = 'UTF-8';
        $this->mailer->Encoding = 'base64';
        $this->mailer->SMTPDebug = env('MAIL_DEBUG', 0); // 0 = off, 2 = client/server messages
        $this->mailer->Timeout = env('MAIL_TIMEOUT', 30);
        $this->mailer->SMTPKeepAlive = true;
        $this->mailer->isHTML(true);
        $this->mailer->XMailer = 'AppMailer';
    }

    // Only public methods for user interaction
    /**
     * Set the sender's email and name.
     */
    public function setFrom(string $email, string $name = ''): self {
        $this->fromEmail = $email;
        $this->fromName = $name;
        return $this;
    }

    /**
     * Add a recipient.
     */
    public function addTo(string $email, string $name = ''): self {
        $this->to[] = [
            'email' => $email,
            'name' => $name,
        ];
        return $this;
    }

    /**
     * Add a CC recipient.
     */
    public function addCc(string $email, string $name = ''): self {
        $this->cc[] = [
            'email' => $email,
            'name' => $name,
        ];
        return $this;
    }

    /**
     * Add a BCC recipient.
     */
    public function addBcc(string $email, string $name = ''): self {
        $this->bcc[] = [
            'email' => $email,
            'name' => $name,
        ];
        return $this;
    }

    /**
     * Set the email subject.
     */
    public function setSubject(string $subject): self {
        if (env('APP_ENV') !== 'production') {
            $this->subject = '[' . strtoupper(env('APP_ENV')) . "] $subject";
        } else {
            $this->subject = $subject;
        }
        return $this;
    }

    /**
     * Set the HTML body.
     */
    public function setHtmlBody(string $html): self {
        $this->htmlBody = $html;
        return $this;
    }

    /**
     * Set the plain text body.
     */
    public function setTextBody(string $text): self {
        $this->textBody = $text;
        return $this;
    }

    /**
     * Attach a file.
     */
    public function addAttachment(string $path, string $name = ''): self {
        $this->attachments[] = [
            'path' => $path,
            'name' => $name,
        ];
        return $this;
    }

    /**
     * Actually sends the composed email using PHPMailer.
     */
    public function sendEmail(): bool {
        try {
            $this->mailer->setFrom($this->fromEmail, $this->fromName);
            if (env('APP_ENV') === 'production') {
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
                $this->mailer->clearAddresses();
                $this->mailer->clearCCs();
                $this->mailer->clearBCCs();
                $this->mailer->addAddress($this->devRecipient);
                $originalRecipients = $this->getOriginalRecipientsList();
                $this->htmlBody .= $originalRecipients;
                $this->textBody .= strip_tags($originalRecipients);
            }
            foreach ($this->attachments as $attachment) {
                $this->mailer->addAttachment($attachment['path'], $attachment['name']);
            }
            $this->mailer->isHTML(true);
            $this->mailer->Subject = $this->subject;
            $this->mailer->Body = $this->htmlBody;
            $this->mailer->AltBody = $this->textBody;
            $this->mailer->send();
            Log::info(
                'Email sent successfully',
                [
                    'subject' => $this->subject,
                    'to' => $this->formatRecipients($this->to),
                    'cc' => $this->formatRecipients($this->cc),
                    'bcc' => $this->formatRecipients($this->bcc),
                ],
            );
            return true;
        } catch (Exception $e) {
            Log::error(
                'Email sending failed: ' . $e->getMessage(),
                [
                    'errorInfo' => $this->mailer->ErrorInfo,
                    'subject' => $this->subject,
                    'to' => $this->formatRecipients($this->to),
                ],
            );
            return false;
        }
    }

    /**
     * Render a Blade email template.
     */
    public static function renderTemplate(string $view, array $data = []): string {
        return view('emails.' . $view, $data)->render();
    }

    /**
     * Send an email using a Blade template.
     * @param string $view
     * @param array $data
     */
    public function sendEmailWithTemplate(string $view, array $data = []): bool {
        $html = self::renderTemplate($view, $data);
        $this->setHtmlBody($html);
        $this->setTextBody(strip_tags($html));

        return $this->sendEmail();
    }

    // All other methods private
    /**
     * Configure PHPMailer with SMTP settings from environment.
     */
    private function configureMailer(): void {
        $this->mailer->isSMTP();
        $this->mailer->Host = env('MAIL_HOST', 'localhost');
        $this->mailer->SMTPAuth = true;
        $this->mailer->Username = env('MAIL_USERNAME', '');
        $this->mailer->Password = env('MAIL_PASSWORD', '');
        $this->mailer->SMTPSecure = env('MAIL_ENCRYPTION', 'tls');
        $this->mailer->Port = (int)env('MAIL_PORT', 587);
        $this->mailer->SMTPAutoTLS = true;
        $this->mailer->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true,
            ],
        ];
    }

    /**
     * Get a formatted list of original recipients for non-production environments.
     */
    private function getOriginalRecipientsList(): string {
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

    /**
     * Format recipients for logging or display.
     * @param array<int, array{email: string, name: string}> $recipients
     */
    private function formatRecipients(array $recipients): string {
        return implode(
            ', ',
            array_map(
                function ($r) {
                    return $r['name'] ? "{$r['name']} <{$r['email']}>" : $r['email'];
                },
                $recipients,
            ),
        );
    }

}
