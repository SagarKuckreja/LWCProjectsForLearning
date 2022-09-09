public with sharing class AccountOperationsController {
@AuraEnabled( cacheable = true ) 
public static List< Account > getAccounts() { 
    
    return [ SELECT Id, Name,Phone FROM Account]; 
} 
    
@AuraEnabled
public static void insertAcc(account acc){
    try{
        insert ACC;
    }catch(Exception ex){
        throw new AuraHandledException(ex.getMessage());
    }
}
@AuraEnabled
public static void deleteAccounts(String accName){
    List<Account> alist =[Select id, Name from Account where Name =: accName];
    try{
        delete alist;
    }catch(Exception ex){
        throw new AuraHandledException(ex.getMessage());
    }
}

}