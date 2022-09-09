public class DuplicateNameAccountTriggerHandler {
    public static boolean DuplicateAccountError_Running = false;
    public static void DuplicateAccountError(List<Account> listOfAccounts){
        if(trigger.isInsert){
            DuplicateAccountError_Running = true;
            List<Account> acclist = new List<Account>([Select id, Name, Phone, Industry From Account]);
            system.debug('acclist'+acclist);
            Map<String,Account> accMap = new Map<String,Account>();
            for(Account acc:accList){
                accMap.put(acc.Name,acc);
            }
            system.debug('accMap'+accMap);
            for(Account acc:listOfAccounts){
                system.debug('accMap.get(acc.Name)'+accMap.get(acc.Name));
                if(accMap.get(acc.Name)!=null){
                    system.debug('show error');
                    acc.adderror('Name already exists');
                }
            }
        }
    }
    public static void AddContactForAccount(List<Account> listOfAccounts){
        if(trigger.isInsert){
            List<Contact> listOfContact = new List<Contact>();
            for(Account Acc: listOfAccounts){
                Contact con = new Contact ();
                Con.FirstName = 'test';
                Con.AccountId = Acc.Id;
                Con.LastName = Acc.Name;
                listOfContact.Add(Con);
            }
            insert listOfContact;
        }
    }
}