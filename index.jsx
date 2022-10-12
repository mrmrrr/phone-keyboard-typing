function c(a){$.writeln(a)};

var comp = app.project.activeItem;

var STRING;
var start;
var foundComp;
var foundFolder;
var currentLetter;
var folderType;
var posLayer;
var posLayer2;
var firstLetterOutPoint;
var textDocument;
var textSourceText;
var charLower;
var charUpper;
var charSymbol;

var layerName;
var project = app.project;
var name1
var name2
var name3
var emptyComp

function getEmpty(){
    
    function first(){
        for(i=1;i<project.numItems;i++){
            if(project.item(i).name == "index folder_"){
                return name1 = i
                }
        }
    }
    ;
    function second(){
        for(j=1;j<=project.item(name1).numItems;j++){
            if(project.item(name1).item(j).name == "lowercase_"){
                return name2 = j
            }
        }    
    }
    ;
    function third(){
        for(k=1;k<=project.item(name1).item(name2).numItems;k++){
            if(project.item(name1).item(name2).item(k).name == "empty_"){
                return name3 = k
            }
        }  
    }
    ;
    first()
    second()
    third()
    return emptyComp = app.project.item(name1).item(name2).item(name3);
}
;


function findFolderByName(e){
    for (var i = 1; i <= app.project.numItems; i ++) {
        if ((app.project.item(i) instanceof FolderItem) && (app.project.item(i).name === e)) {
            return app.project.item(i);
        }
    }
}
;
function findCompByName(e){
    for (var i = 1; i <= app.project.numItems; i ++) {
        if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).name === e)) {
            return app.project.item(i);
        }
    }
}
;



//----------------------
var dialog = new Window("palette"); 
dialog.text = "Keyboard Typer"; 
dialog.orientation = "column"; 
dialog.alignChildren = ["center","top"]; 
dialog.spacing = 10; 
dialog.margins = 16; 
var group1 = dialog.add("group", undefined, {name: "group1"}); 
group1.orientation = "row"; 
group1.alignChildren = ["left","center"]; 
group1.spacing = 10; 
group1.margins = 0; 
var yourText = group1.add('edittext {properties: {name: "yourText"}}'); 
yourText.text = "qfvr 345  fdg"; 
yourText.alignment = ["left","top"]; 
var btn1 = group1.add("button", undefined, undefined, {name: "btn1"}); 
btn1.text = "Make it!"; 
var btn2 = dialog.add("button", undefined, undefined, {name: "btn2"}); 
btn2.text = "Clear"; 
btn2.alignment = ["left","top"]; 
//----------------------

btn1.onClick = function(){
    STRING = yourText.text;
    app.beginUndoGroup("Phone Keyboard");

    comp.layers.addText("your text");
    comp.layer("your text").property("transform").property("Position").setValue([253,270]);

    textSourceText = comp.layer("your text").property("ADBE Text Properties").property("ADBE Text Document");
    textDocument = textSourceText.value;
    textDocument.fontSize = 65;
    textDocument.fillColor = [0,0,0];
    textSourceText.setValue(textDocument);

    //какая буква МАЛЕНЬКАЯ или БОЛЬШАЯ или СИМВОЛ ??? return folderType
    function checkForCharacter(e){
        charSymbol = RegExp(/[-\[\d\]@!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/).test(e);
        
        if(charSymbol)charSymbol = currentLetter;//что с этим делать
        
        charLower = e.toLowerCase();
        charUpper = e.toUpperCase();
        
        switch(e){
            case charSymbol:
//~                 alert('number   '+ currentLetter)
                return folderType = "hover numberSymbol_";
                break;
            case charLower:
//~                 alert('lower    '+charSymbol)
                return folderType = "hover lowercase_";
                break;
            case charUpper:
//~                 alert('UP')
                return folderType = "hover UPPERCASE_";
                break;
            default:
//~                 alert('def')
                break;
        }
    }
    ;

    //НАЙТИ ПАПКУ с [большими] или [маленькими] буквами или [символами]
    function findFolderNumber(nameFolder){  //folderType
        var itemsF = app.project.items;
        var f = 1;
        while (f <= itemsF.length) {
            if (itemsF[f].name == nameFolder){
                return foundFolderNumber = f;
            }
            f++;
        }
    }
    ;

    function findItem(name){//currentLetter
        var items = app.project.item(foundFolderNumber).items;
        var i = 1;
        while (i <= items.length) {
            if (items[i].name == name+"_"){
                return foundComp = i;
            }
            i++;
        }
    }
    ;

    function positionCurrentLetter(e){
        
        currentLetter.toString();
        if(currentLetter == "space"){
            posLayer = [comp.layer("char Anchors").property("Contents").property("space").property("Position").value[0], comp.layer("char Anchors").property("Contents").property("space").property("Position").value[1]];
            posLayer2 = [comp.layer("char Anchors").property("Contents").property("space 2").property("Position").value[0], comp.layer("char Anchors").property("Contents").property("space 2").property("Position").value[1]];
            comp.layer("space num"+q).property("Transform").property("Position").setValue(posLayer2);
            comp.layer("space char"+q).property("Transform").property("Position").setValue(posLayer);
        }else{
            if(e == e.toLowerCase()){
                posLayer = [comp.layer("char Anchors").property("Contents").property(e).property("Position").value[0], comp.layer("char Anchors").property("Contents").property(e).property("Position").value[1]];
                comp.layer(e+"_"+q).property("Transform").property("Position").setValue(posLayer);
            }else{
                    e = e.toLowerCase();
                    posLayer = [comp.layer("char Anchors").property("Contents").property(e).property("Position").value[0], comp.layer("char Anchors").property("Contents").property(e).property("Position").value[1]];
                    comp.layer(e.toUpperCase()+"_"+q).property("Transform").property("Position").setValue(posLayer);
            }
        }
    }
    ;

    //--------------------------BEGIN

    //empty внизу появляется
    comp.layers.add(getEmpty());
    
    for(var q=0; q<STRING.length; q++){
        
        currentLetter = STRING[q];
        
//~         if(currentLetter == ","||currentLetter == "/"){
//~             проверить какая была предыдущая буква или цифра 
//~         }
        
        if(currentLetter == " "){
            currentLetter = "space";
            
            checkForCharacter(currentLetter);
            findFolderNumber(folderType);
            findItem(currentLetter);
            
            layerName = app.project.item(foundFolderNumber).item(foundComp).layer(1).name;
            app.activeViewer.setActive();
            app.executeCommand(2004);
            app.project.item(foundFolderNumber).item(foundComp).layer(1).copyToComp(comp);
            comp.layer(layerName).name = "space num"+q;

            layerName = app.project.item(foundFolderNumber).item(foundComp).layer(2).name;
            app.activeViewer.setActive();
            app.executeCommand(2004);
            app.project.item(foundFolderNumber).item(foundComp).layer(2).copyToComp(comp);
            comp.layer(layerName).name = "space char"+q;

            positionCurrentLetter(currentLetter);
            
            continue
        }
        
        //большая или маленькая
        checkForCharacter(currentLetter);//return folderType
        //hover lowercase_ folderType
        //найти номер папки с композициями
        findFolderNumber(folderType);//return foundFolderNumber
        
        //найти композицию в найденной папке
        findItem(currentLetter);// return foundComp
        
        comp.layers.add(app.project.item(foundFolderNumber).item(foundComp));

        //номер вставленного компа
        comp.selectedLayers[0].name = comp.selectedLayers[0].name+q;
        
        //позишн ховера
        positionCurrentLetter(currentLetter);
//~         return
    }
    ;
    
    firstLetterOutPoint = comp.layer("empty_").outPoint;

    for(i=0;i<STRING.length;i++){
        
        if(STRING[i] == " "){
            comp.layer("space num"+i).startTime = firstLetterOutPoint;
            comp.layer("space char"+i).startTime = firstLetterOutPoint;
            firstLetterOutPoint = comp.layer("space char"+i).outPoint;
            continue
        }

        comp.layer(STRING[i]+"_"+i).startTime = firstLetterOutPoint;
       
        firstLetterOutPoint = comp.layer(STRING[i]+"_"+i).outPoint;
    }
    ;

    //раставить ключи  ШИФТ      ЦИФРЫ     ЗНАКИ  на дефолт кейборд
    //начальные для эмпти
    comp.layer("default keyboard_").property("ADBE Effect Parade").property(1).property("ADBE Checkbox Control-0001").setValueAtTime(0, 0);
    comp.layer("default keyboard_").property("ADBE Effect Parade").property(2).property("ADBE Checkbox Control-0001").setValueAtTime(0, 0);
    
    for(i=0;i<STRING.length;i++){
        if(STRING[i] == " "){
            continue
        }
        if(STRING[i] == STRING[i].toUpperCase()){
                comp.layer("default keyboard_").property("ADBE Effect Parade").
                    property(1).
                        property("ADBE Checkbox Control-0001").
                            setValueAtTime(comp.layer(STRING[i]+"_"+i).startTime, 1);
                comp.layer("default keyboard_").property("ADBE Effect Parade").
                    property(1).
                        property("ADBE Checkbox Control-0001").
                            setValueAtTime(comp.layer(STRING[i]+"_"+i).outPoint, 1);
        }
        if(STRING[i] == STRING[i].toLowerCase()){
                comp.layer("default keyboard_").property("ADBE Effect Parade").
                    property(1).
                        property("ADBE Checkbox Control-0001").
                            setValueAtTime(comp.layer(STRING[i]+"_"+i).startTime, 0);
                comp.layer("default keyboard_").property("ADBE Effect Parade"). 
                    property(1).
                        property("ADBE Checkbox Control-0001").
                            setValueAtTime(comp.layer(STRING[i]+"_"+i).outPoint, 0);
        }
        if( RegExp(/[-\[\d\]@!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/).test(STRING[i]) ){
            
                comp.layer("default keyboard_").property("ADBE Effect Parade").
                    property(2).
                        property("ADBE Checkbox Control-0001").
                            setValueAtTime(comp.layer(STRING[i]+"_"+i).startTime, 1);
                comp.layer("default keyboard_").property("ADBE Effect Parade"). 
                    property(2).
                        property("ADBE Checkbox Control-0001").
                            setValueAtTime(comp.layer(STRING[i]+"_"+i).outPoint, 1);
        }else{
            comp.layer("default keyboard_").property("ADBE Effect Parade").
                    property(2).
                        property("ADBE Checkbox Control-0001").
                            setValueAtTime(comp.layer(STRING[i]+"_"+i).startTime, 0);
                comp.layer("default keyboard_").property("ADBE Effect Parade"). 
                    property(2).
                        property("ADBE Checkbox Control-0001").
                            setValueAtTime(comp.layer(STRING[i]+"_"+i).outPoint, 0);
            }
    }
    ;

    app.activeViewer.setActive();
    app.executeCommand(2004);
    comp.layer("your text").property("ADBE Text Properties").property("ADBE Text Document").setValue(STRING);
    comp.layer(STRING).selected = true;
    app.executeCommand(3042);//Opacity

    //set units to index
    comp.layer(STRING).
        property("ADBE Text Properties").
        property("ADBE Text Animators").
        property("ADBE Text Animator").
        property("ADBE Text Selectors").
        property("ADBE Text Selector").
        property("ADBE Text Range Advanced").
        property("ADBE Text Range Units").setValue(2);
        
    //opacity
    comp.layer(STRING).
        property("ADBE Text Properties").
        property("ADBE Text Animators").
        property("ADBE Text Animator").
        property("ADBE Text Animator Properties").
        property("ADBE Text Opacity").setValue(0);
        
    //smoothness
    comp.layer(STRING).
        property("ADBE Text Properties").
        property("ADBE Text Animators").
        property("ADBE Text Animator").
        property("ADBE Text Selectors").
        property("ADBE Text Selector").
        property("ADBE Text Range Advanced").
        property("ADBE Text Selector Smoothness").setValue(0);
        
    //start
    start = comp.layer(STRING).
        property("ADBE Text Properties").
        property("ADBE Text Animators").
        property("ADBE Text Animator").
        property("ADBE Text Selectors").
        property("ADBE Text Selector").
        property("ADBE Text Index Start");
    start.expression = "Math.floor(value)";


    //первые и последние ключи на слое с текстом
    start.setValueAtTime(0, 0);
    start.setValueAtTime(comp.layer("empty_").outPoint, 1);
    start.setValueAtTime(comp.layer(1).startTime, STRING.length)

    app.endUndoGroup();
}
;

dialog.show();