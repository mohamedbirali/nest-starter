import { omit } from "lodash-es";
import { AbstractFirestore } from '@org/firebase';
import { Observable, map } from 'rxjs';
import { IChatService } from '../interfaces/chat.service.interface';
import { Injectable, inject } from '@angular/core';
import {
  TProfile,
  TChat,
  TContact,
} from '@org/lib-org-types';
import { CHATS, CONTACTS, MESSAGES, PROFILE } from '../mock/chat.mock';

@Injectable({ providedIn: 'root' })
export class ChatService implements IChatService {

  // injections
  readonly #_abstractFirestore = inject(AbstractFirestore);
  // readonly #_abstractFirestorage = inject(AbstractFirestorage);

  readonly #chats = 'chats';
  readonly #contacts = 'contacts';
  readonly #profile: string = 'profile';
  readonly #userConnected: string = 'WPKncKwqYlh7k7RTHabg';

  //
  getChats$ (): Observable<TChat[]> {
    return this.#_abstractFirestore.getCollection$(this.#chats);
  }

  getContacts$ (): Observable<TContact[]> {
    return this.#_abstractFirestore.getCollection$(this.#contacts)
      .pipe(
        map((contacts: TContact[]) => {
          return contacts.sort((a, b) => a.name.localeCompare(b.name))
            .map((contacts) => omit(contacts, ['details', 'attachments']))
        })
      );;
  }

  getContactById$ (path: string): Observable<TContact> {
    return this.#_abstractFirestore.getDoc$(this.#contacts, path);
  }

  getProfile$ (): Observable<TProfile> {
    return this.#_abstractFirestore.getDoc$(this.#profile, this.#userConnected)
  }

  getChatById$ (path: string): Observable<TChat> {
    return this.#_abstractFirestore.getDoc$(this.#chats, path);
  }

  updateChat$ (id: string, chat: TChat) {
    return this.#_abstractFirestore.updateDoc$(this.#chats, id, chat);
  }

  updateProfile$ (profile: Partial<TProfile>): Observable<TProfile> {
    return this.#_abstractFirestore.updateDoc$(this.#profile, this.#userConnected, profile);
  }

  updateProfileAvatar$ (file: File, userId: string): Observable<boolean> {

    throw new Error("Method not implemented.");
  }

  resetChat$ (): void {
    throw new Error("Method not implemented.");
  }

  seedChat () {
    let chat = CHATS.map(chat => ({
      ...chat,
      // Get the actual contact object from the id and attach it to the chat
      contact: CONTACTS.find(contact => contact.id === chat.contactId),
      // Since we use same set of messages on all chats, we assign them here.
      messages: MESSAGES.map(message => ({
        ...message,
        chatId: chat.id,
        contactId: message.contactId === 'me' ? PROFILE.id : chat.contactId,
        isMine: message.contactId === 'me',
      })),
    }));

    this.#seed('chats', chat);
    this.#seed('messages', MESSAGES);
    this.#seed('contacts', CONTACTS);
    this.#_abstractFirestore.addDoc$('profile', PROFILE);
  }

  #seed (collection: string, _array: Array<any>,) {
    _array.forEach(
      (doc) => this.#_abstractFirestore.addDoc$(collection, doc)
    );
  }

}
