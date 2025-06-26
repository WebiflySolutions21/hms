import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChatMessage, ChatService } from 'src/app/core/services';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
   // Required inputs
   @Input() currentUserRole!: string;
   @Input() availableRoles: string[] = ['superadmin','admin','doctor','reception','staff','lab','medical'];
   
   // Optional inputs with defaults
   @Input() floatingButton: boolean = true;
   @Input() defaultOpen: boolean = false;
   @Input() title: string = 'Team Chat';
   
   // Internal state
   selectedRoles: string[] = [];
   newMessage = '';
   messages: ChatMessage[] = [];
   sendToAll = false;
   unreadCount = 0;
   searchQuery = '';
   chatOpen = false;
   
   constructor(private chatService: ChatService, private cdr: ChangeDetectorRef) {}
 
   ngOnInit(): void {
     this.chatOpen = this.defaultOpen;
     this.loadMessages();
   }
 
   ngOnChanges(changes: SimpleChanges): void {
     if (changes['currentUserRole'] || changes['availableRoles']) {
       this.loadMessages();
     }
   }
 
   toggleChatWindow(): void {
     this.chatOpen = !this.chatOpen;
     if (this.chatOpen) {
       this.markMessagesAsRead();
     }
   }
 
   isSender(msg: ChatMessage): boolean {
     return msg.fromRole === this.currentUserRole;
   }
 
   loadMessages(): void {
     if (!this.currentUserRole || !this.availableRoles) return;
     
     this.messages = this.chatService.getMessages().filter(msg =>
       msg.toRoles.includes(this.currentUserRole) || msg.fromRole === this.currentUserRole
     );
 
     this.unreadCount = this.messages.filter(msg => 
       msg.fromRole !== this.currentUserRole && !msg.readBy.includes(this.currentUserRole)
     ).length;
   }
 
   sendMessage(): void {
     if (!this.newMessage.trim()) return;
 
     const message: any = {
       id: crypto.randomUUID(),
       fromRole: this.currentUserRole,
       toRoles: this.sendToAll
         ? this.availableRoles.filter(role => role !== this.currentUserRole)
         : this.selectedRoles,
       content: this.newMessage,
       timestamp: new Date(),
       readBy: [this.currentUserRole]
     };
 
     this.chatService.sendMessage(message);
     this.newMessage = '';
     this.loadMessages();
   }
 
   markMessagesAsRead(): void {
     const unreadMessages = this.messages.filter(msg => 
       msg.fromRole !== this.currentUserRole && !msg.readBy.includes(this.currentUserRole)
     );
     
     unreadMessages.forEach((msg:any) => {
       msg.readBy.push(this.currentUserRole);
       this.chatService.updateMessages(msg);
     });
     
     this.loadMessages();
   }
 
   isRead(msg: ChatMessage): boolean {
     return msg.readBy.includes(this.currentUserRole);
   }
 
   markMessageAsRead(msg: any): void {
     if (!this.isRead(msg) && msg.fromRole !== this.currentUserRole) {
       msg.readBy.push(this.currentUserRole);
       this.chatService.updateMessages(msg);
       this.updateUnreadCount();
     }
   }
 
   updateUnreadCount(): void {
     this.unreadCount = this.messages.filter(msg => 
       msg.fromRole !== this.currentUserRole && !msg.readBy.includes(this.currentUserRole)
     ).length;
   }
 
   filteredRoles(): string[] {
     return this.availableRoles.filter(role => 
       role.toLowerCase().includes(this.searchQuery.toLowerCase()) && 
       role !== this.currentUserRole
     );
   }
 
   handleSendToAll(): void {
     if (this.sendToAll) {
       this.selectedRoles = [...this.availableRoles.filter(role => role !== this.currentUserRole)];
     } else {
       this.selectedRoles = [];
     }
     this.cdr.detectChanges();
   }
   
   toggleRoleSelection(role: string): void {
     const index = this.selectedRoles.indexOf(role);
     if (index > -1) {
       this.selectedRoles.splice(index, 1);
     } else {
       this.selectedRoles.push(role);
     }
     
     const allPossibleRoles = this.availableRoles.filter(r => r !== this.currentUserRole);
     this.sendToAll = allPossibleRoles.length === this.selectedRoles.length;
   }
}