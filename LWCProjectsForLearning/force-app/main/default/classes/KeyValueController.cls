public with sharing class KeyValueController {
    @AuraEnabled( cacheable = true )  
    public static Integer getValue(Integer key){
        map<integer,integer> mapOfValueWithKey = new map<integer,Integer>();
        mapOfValueWithKey.put(1,1);
        mapOfValueWithKey.put(2,3);
        mapOfValueWithKey.put(3,5);
        mapOfValueWithKey.put(4,7);
        mapOfValueWithKey.put(5,9);
        Integer showValue = mapOfValueWithKey.get(key);
        return showValue;
    }
    }
    