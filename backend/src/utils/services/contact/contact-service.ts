import { BaseService } from "../../class/base-service-class";
import { ContactType } from "../../types/contact-type";

class ContactService extends BaseService<ContactType> {}

export const contactService = new ContactService();
