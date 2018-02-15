var app = angular.module("characterBuilder",[]);



app.controller("featController", function ($scope,$http){

    // VARIABLES

      $scope.featList = {
        "Improved Feint": {name:"Improved Feint",prerequisite:"feat:Combat Expertise;int:13;",shortDescription:"Feint as a move action",featTypes:"G,C", benefits:"ability:You can make a Bluff check to feint in combat as a move action;"},
        "Combat Expertise": {name:"Combat Expertise",prerequisite:"int:13;",shortDescription:"Trade attack bonus for AC bonus",featTypes:"G,C", benefits:"ability:You can choose to take a -1 penalty on melee attack rolls...;"},
        "Greater Feint": {name:"Greater Feint",prerequisite:"bab:6;feat:Improved Feint, Combat Expertise;int:13;",shortDescription:"Enemies you feint lose their Dex bonus for 1 round",featTypes:"G,C", benefits:"ability:Whenever you use feint to cause an opponent to lose his Dexteriy bonus, he loses that bonus until the beginning of your next..;"},
        "Deceptive Exchange": {name:"Deceptive Exchange",prerequisite:"feat:Improved Feint,Combat Expertise;int:13;",shortDescription:"Upon successful feint, you may force opponent to accept an object",featTypes:"G", benefits:"ability:If you successfully feint an opponent into accepting a one-handed object you are ...;"},
    };
    
    $scope.weapons = { "Gauntlet" : {
    "name": "Gauntlet",
    "shortDescription" : "This metal glove lets you deal letha damage with unarmed strikes.",
    "proficiency" : "Simple Weapons",
    "subtype" : "Unarmed Attacks",
    "cost": 2,
    "damage": {
        "small" : "1d2",
        "medium" : "1d3"
    },
    "critical" : 2,
    "range" : 0,
    "weight": 1,
    "types" : ["B"],
    "specials" : [],
    "source" : ""},
    "Unarmed Strike" : {
    "name": "Unarmed Strike",
    "shortDescription" : "An umarmed strike is always considered a light weapon.",
    "proficiency" : "Simple Weapons",
    "subtype" : "Unarmed Attacks",
    "cost": 0,
    "damage": {
        "small" : "1d2",
        "medium" : "1d3"
    },
    "critical" : 2,
    "range" : 0,
    "weight": 0,
    "types" : ["B"],
    "specials" : ["Nonlethal"],
    "source" : ""}                          
    }

    $scope.inventory = [];
    $scope.selectedItem;

    $scope.equipedItems = {
        "Head" : {slot:"Head",item:"Helmet"},
        "Headband" : {slot:"Headband",item:"Headband of the Beast +2"},
        "Eyes" : {slot:"Eyes",item:"Goggles of the Vulture"},
        "Shoulders" : {slot:"Shoulders",item:"Cloak of Resistance +1"},
        "Neck" : {slot:"Neck",item:"Fireresistance Necklace"},
        "Chest" : {slot:"Chest",item:"Extador Leather"},
        "Body" : {slot:"Body",item:""},
        "Armor" : {slot:"Armor",item:"Chain Shirt +3"},
        "Belt" : {slot:"Belt",item:"Belt of Bulls Strength +2"},
        "Wrists" : {slot:"Wrists",item:""},
        "Hands" : {slot:"Hands",item:"Gloves"},
        "Ring1" : {slot:"Ring1",item:"Ring of Protection +4"},
        "Ring2" : {slot:"Ring2",item:"Ring of Dunedan +2"},
        "Feet" : {slot:"Feet",item:"Trousers"}
};
    
    // LOADING
    
    $http.get("./data/items/weapons/data.json").then(function(response){
        
    
        
    });
    
    // CORE
    
    $scope.selectItem = function (item){
        
        if(!item || $scope.selectedItem == item){
           
            return;   
        }
        console.log(item);
        $scope.selectedItem = item;
    };
    
    $scope.equipItemFromInventory = function (item,index){
        
      if(item){
          $scope.equipedItems[item.slot] = item;
          $scope.inventory.splice(index,1);
      }
        else{
            console.log("Equip Exception: " + item);
        }
        
    };
    
    $scope.unequipItemFromSlot = function (slot){

      if($scope.equipedItems[slot].item){
        $scope.inventory.push($scope.equipedItems[slot]);
        $scope.equipedItems[slot] = {slot:slot,item:""};
      }      
      else{
          console.log("Slot Exception: " + slot + ", Item:" + $scope.equipedItems[slot].item);
      }
    };
  
    $scope.isFeedDependend = function(initialFeatName,targetFeatName){
        
         var isDependend = false;
         var prerequisites = $scope.featList_[targetFeatName]["prerequsites"];
            
            if(prerequisites.includes(initialFeatName)){

                isDependend = true;
            }
            
        return isDependend;
            
    };

    // X needs Y to work
    $scope.featPrerequisiteTree = [];
    
    // X is requisite for Y
    $scope.featDependencyTree = [];
    
    $scope.getTreeFromFeat = function(featname){
        
        
        if(!featname)
            return "";

        //Delete all 
        $scope.featPrerequisiteTree = [];
        $scope.featDependencyTree = [];

        var featname_;
        
        if(featname[0].indexOf(":") != -1){

            featname_ = featname[0].split(":")[0];
        }
        else{
            featname_ = featname;
        }
        
        $scope.selected_feat_from_tree = $scope.featList[featname_];

        Object.keys($scope.featList).forEach(function (element) {
            
           
            var requisite = $scope.featList[featname_]["prerequisite"];
            var featname__  = $scope.featList[element]["name"];
            
            if(requisite.includes(featname__)){

                $scope.featPrerequisiteTree.push(featname__);
            }
            
            
            requisite = $scope.featList[element]["prerequisite"];
            
            if(requisite.includes(featname_)){

                $scope.featDependencyTree.push(element);
            }
            
            
        
        });
    };
    
    
    
});