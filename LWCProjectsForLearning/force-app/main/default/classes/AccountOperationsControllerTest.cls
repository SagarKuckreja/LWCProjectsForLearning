@IsTest
public class AccountOperationsControllerTest {
    static testmethod void TestAccount(){
        AccountOperationsController.getAccounts();
    }
    static testmethod void insertAccount(){
        Account acc = new Account();
        acc.Name = 'Test';
        acc.Phone = '123456';
        AccountOperationsController.insertAcc(acc);
        system.assertNotEquals(null,acc.Id);
    }
    static testmethod void deleteAccount(){
        Account acc = new Account();
        acc.Name = 'Test';
        acc.Phone = '123456';
        insert acc;
        AccountOperationsController.deleteAccounts('Test');
    }
}