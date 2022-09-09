@IsTest
public class DuplicateNameAccountTriggerHandlerTest {
    static testmethod void testAccount(){
        Account acc = new Account();
        acc.Name ='test';
        acc.Phone = '12345';
        acc.Industry = 'Banking';
        insert acc;
    }
     static testmethod void testAccount2(){
        Account acc = new Account();
        acc.Name ='test';
        acc.Phone = '12345';
        acc.Industry = 'Banking';
        insert acc;
         
        Account acc1 = new Account();
        acc1.Name ='test';
        acc1.Phone = '12345';
        acc1.Industry = 'Banking';
         try {
            Database.SaveResult result = Database.insert(acc1, false);
            } catch(DMLException e) {
            System.assertEquals('Name already exists',e.getMessage()); 
            }
    }

}