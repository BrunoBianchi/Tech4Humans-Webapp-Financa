import { BaseService } from "../../class/base-service-class";
import { Account } from "../../types/account-type";

 class AccountService extends BaseService<Account> {

}

export const accountService = new AccountService();