public with sharing class SplitArrayController {
    @AuraEnabled( cacheable = true )
public static List<String> ShowTable(String str) {
List<String> listStr = new List<String>();
try {
    If(!str.contains('@') && !str.contains('#') && !str.contains('/') && !str.contains('|') ){
        If(str.length()>1){
                str = str.removeEnd(',');
        }
        listStr=str.split(',');
        }
}
    catch (Exception e) {
    throw new AuraHandledException(e.getMessage());
    }
        return listStr;
}
}