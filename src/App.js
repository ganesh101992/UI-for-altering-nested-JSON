import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Draggable, Droppable} from 'react-drag-and-drop';
import data from './data_english.json';
import global_data from './global_variables.json';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="main">
        <div id="tags">
        <p id="sectionTag"> <span>{global_data.current_section_name}</span> / </p>
        </div>
        {
            //data[0][0].possibleValues[2][0].possibleValues.map((sections, i)=><EnteringNewSection key={i} data={sections}/>) 
            data.map((sections, i)=><EnteringNewSection key={i} data={sections}/>)
        }
      </div>
    );	
  }
}

class EnteringNewSection extends Component {
  constructor(){
    super();
    this.moving_definition="";
    this.moving_definition_object={};
    this.shifting_definition="";
    this.currentName="";
    this.dragging_item=false;
    this.addDefinitions = this.addDefinitions.bind(this); 
    this.Inc_index_of_current_section = this.Inc_index_of_current_section.bind(this);
    this.addColumns = this.addColumns.bind(this);
    this.changeText = this.changeText.bind(this);
    this.setText=this.setText.bind(this);
    this.traverse=this.traverse.bind(this);
    this.dragging=this.dragging.bind(this);
    this.dropped=this.dropped.bind(this);
    this.draw=this.draw.bind(this);
  };

  traverse(e){
    var diffTags=global_data.current_section_name.split("/");
    if(!(e.target.innerHTML===diffTags[diffTags.length-1]))
    {
      global_data.current_section_name="";
      var subSection=data;
      var found=false;
      for(var i=0;i<global_data.index_of_current_section;i++){
         for(var j=0;j<subSection.length;j++){
         for(var k=0;k<subSection[j].length;k++)
            if(subSection[j][k].definition.toString()===diffTags[i]){
               if(global_data.current_section_name==="")
                  global_data.current_section_name=diffTags[i];
               else
                  global_data.current_section_name+="/"+diffTags[i];
               if(subSection[j][k].definition.toString()===e.target.innerHTML){
                  found=true;
                  global_data.index_of_current_section=i+1;
               }
               subSection=subSection[j][k].possibleValues;
               break;
            }
         if(found){
            break;
         }
         }
      }
      this.draw(subSection);
    }
  };

  setText(e){
    var key=e.which || e.keyCode;
    
    if(key===13){
      var subSection=data;
      var cond=false;
      var diffTags=global_data.current_section_name.split("/");
      for(var i=0;i<global_data.index_of_current_section;i++){
         cond=false;
         for(var j=0;j<subSection.length;j++){
            for(var k=0;k<subSection[j].length;k++)
               if(subSection[j][k].definition.toString()===diffTags[i]){
                 subSection=subSection[j][k].possibleValues;
                 cond=true;
                 break;
               }
            if(cond) break;
         }
      }

      for(j=0;j<subSection.length;j++)    
         for(k=0;k<subSection[j].length;k++){
            if(subSection[j][k].definition.toString()===this.currentName){
               subSection[j][k].definition=e.target.value;
               break;
            }
         }
      this.currentName="";
      this.draw(subSection);
      //console.log(data);
    }
  }
  
  changeText(e){
    e.preventDefault();
    if(e.target.tagName==="P"){
       e.target=e.target.parentNode;
    }
    this.currentName=e.target.childNodes[0].innerHTML;   

      var array_coloumns=[];
      var array=[];
      var key=0;
      var diffTags=global_data.current_section_name.split("/");
      var child_react=React.createElement('b',{key:key++},diffTags[0]);
      array.push(child_react);
      for(var i=1;i<diffTags.length;i++)
      {
          child_react=React.createElement('span',{key:key++},' / ');
          array.push(child_react);
          child_react=React.createElement('b',{key:key++},diffTags[i]);
          array.push(child_react);
      }
      var parent_react=React.createElement('p',{key:key++,id:'sectionTag'},array);
      parent_react=React.createElement('div',{key:key++,id:'tags',onClick:this.traverse},parent_react);
      array_coloumns.push(parent_react);

      var subSection=data;
      var cond=false;
      diffTags=global_data.current_section_name.split("/");
      for(i=0;i<global_data.index_of_current_section;i++){
         cond=false;
         for(var j=0;j<subSection.length;j++){
            for(var k=0;k<subSection[j].length;k++)
               if(subSection[j][k].definition.toString()===diffTags[i]){
                 subSection=subSection[j][k].possibleValues;
                 cond=true;
                 break;
               }
            if(cond) break;
         }
      }

      for(i=0;i<subSection.length;i++){
         array=[];
         var p_child_react=React.createElement('p',{key:key++,align:'center'},'-');
         child_react=React.createElement('div',{key:key++,id:'add_tab'},p_child_react);
         array.push(child_react);
         for(j=0;j<subSection[i].length;j++)
         {
             if(subSection[i][j].definition.toString()===this.currentName){
                p_child_react=React.createElement('input',{key:key++,id:'input_tag',type:'text',onKeyPress:this.setText});
                child_react=React.createElement('div',{key:key++,id:'sections_tab',onClick:this.Inc_index_of_current_section, onContextMenu:this.changeText},p_child_react);
                array.push(child_react);
             }else{
                p_child_react=React.createElement('p',{key:key++,align:'center'},subSection[i][j].definition);
                child_react=React.createElement('div',{key:key++,id:'sections_tab',onClick:this.Inc_index_of_current_section, onContextMenu:this.changeText},p_child_react);
                array.push(child_react);
             }
         }
         p_child_react=React.createElement('p',{key:key++,align:'center'},'+');
         child_react=React.createElement('div',{key:key++,id:'add_tab',onClick:this.addDefinitions},p_child_react);
         array.push(child_react);
         parent_react=React.createElement('div',{key:key++,id:'tabs'},array);
         array_coloumns.push(parent_react);
      }
      p_child_react=React.createElement('p',{key:key++,align:'center'},'+');
      child_react=React.createElement('div',{key:key++,id:'add_tab',onClick:this.addColumns},p_child_react);
      parent_react=React.createElement('div',{key:key++,id:'tabs'},child_react);
      array_coloumns.push(parent_react);
      ReactDOM.render(array_coloumns,document.getElementById("main"));
  }

  addColumns(e){
      //console.log("updated the current tags");

      var subSection=data;
      var cond=false;
      var diffTags=global_data.current_section_name.split("/");
      for(var i=0;i<global_data.index_of_current_section;i++){
         cond=false;
         for(var j=0;j<subSection.length;j++){
            for(var k=0;k<subSection[j].length;k++)
               if(subSection[j][k].definition.toString()===diffTags[i]){
                 subSection=subSection[j][k].possibleValues;
                 cond=true;
                 break;
               }
            if(cond) break;
         }
      }
      subSection.push([]);
      console.log("adding col");
      this.draw(subSection);
      //console.log(data);
      //console.log(subSection);
  };

  addDefinitions(e){
     //console.log(e.target.innerHTML);
     if(global_data.current_section_name===".."){
        var newData={};
        newData.definition="";
        newData.possibleValues=[];
        data[0].push(newData);
     }
     else{
        var subSection=data;
        var diffTags=global_data.current_section_name.split("/");
        var cond=false;
        for(var i=0;i<global_data.index_of_current_section;i++){
         cond=false;
         for(var j=0;j<subSection.length;j++){
         for(var k=0;k<subSection[j].length;k++)
            if(subSection[j][k].definition.toString()===diffTags[i]){
               subSection=subSection[j][k].possibleValues;
               cond=true;
               break;
            }
         if(cond) break;
         }
        }
        var parent=e.target.parentNode;
        while(parent.id!=="tabs")
             parent=parent.parentNode;
        newData={};
        newData.definition="";
        newData.possibleValues=[];       
        if(parent.childNodes.length===2){
           for(i=0;i<subSection.length;i++)
              if(subSection[i].length===0)
                subSection[i].push(newData);
        }
        else{
           //console.log(parent.childNodes[1].innerText.replace(/\n/g,''));
           for(i=0;i<subSection.length;i++){
              for(j=0;j<subSection[i].length;j++){
                 if(subSection[i][j].definition.toString()===parent.childNodes[1].innerText.replace(/\n/g,''))
                     subSection[i].push(newData);
              }
           }
        }
     }
     console.log("adding def");
     this.draw(subSection);
      //console.log(data);
  };

  Inc_index_of_current_section(e) {
      var currentTag="";
      if(e.target.tagName==="DIV")
      {
          currentTag=e.target.childNodes[0].tagName;
      }
      else{
          currentTag=e.target.tagName;
      }
    if(currentTag==="P"){
      global_data.index_of_current_section++;
      //console.log(ReactDOM.findDOMNode(document.body))  
      if(global_data.current_section_name==="..")
      {
         if(e.target.tagName==="DIV")
         {
            global_data.current_section_name=e.target.childNodes[0].innerHTML;
         }else{
            global_data.current_section_name=e.target.innerHTML;
         }
      }
      else
      {
         if(e.target.tagName==="DIV")
         {
            global_data.current_section_name+="/"+e.target.childNodes[0].innerHTML;
         }else{
            global_data.current_section_name+="/"+e.target.innerHTML;
         }         
      }    

      var subSection=data;
      var cond=false;
      var diffTags=global_data.current_section_name.split("/");
      for(var i=0;i<global_data.index_of_current_section;i++){
         cond=false;
         for(var j=0;j<subSection.length;j++){
            for(var k=0;k<subSection[j].length;k++)
               if(subSection[j][k].definition.toString()===diffTags[i]){
                 subSection=subSection[j][k].possibleValues;
                 cond=true;
                 break;
               }
            if(cond) break;
         }
      }
      this.draw(subSection);
      //console.log("updated the current tags");  
      //console.log(global_data);
     }
  }

  dropped(e){
    if(this.moving_definition!=="" && this.shifting_definition!=="+"){
      var subSection=data;
      var cond=false;
      var diffTags=global_data.current_section_name.split("/");
      for(var i=0;i<global_data.index_of_current_section;i++){
         cond=false;
         for(var j=0;j<subSection.length;j++){
            for(var k=0;k<subSection[j].length;k++)
               if(subSection[j][k].definition.toString()===diffTags[i]){
                 subSection=subSection[j][k].possibleValues;
                 cond=true;
                 break;
               }
            if(cond) break;
         }
      }

      //console.log("moving def "+this.moving_definition);
      //console.log("shifting def "+this.shifting_definition);
      //console.log(this.moving_definition_object);
      var new_possibleValues=[];
      cond=false;
      for(i=0;i<subSection.length;i++){
         for(j=0;j<subSection[i].length;j++){
            if(subSection[i][j].definition.toString()===this.shifting_definition){
                new_possibleValues.push(this.moving_definition_object);
                new_possibleValues.push(subSection[i][j]);
            }else if(subSection[i][j].definition.toString()!==this.moving_definition){
                new_possibleValues.push(subSection[i][j]);
             }
          }
          subSection[i]=new_possibleValues;
          //console.log(new_possibleValues);
          new_possibleValues=[];
      }
      this.draw(subSection);       
       
       this.moving_definition="";
       this.shifting_definition="";
       this.moving_definition_object={};
       //console.log("Dropped");
       this.dragging_item=false;
    }
  }

  dragging(e){
    if(this.dragging_item===false){
      if(e.target.tagName==="DIV")
         this.moving_definition=e.target.childNodes[0].innerHTML;
      else
         this.moving_definition=e.target.innerHTML;
      this.shifting_definition="";
      this.moving_definition_object={};
      
      var subSection=data;
      var cond=false;
      var diffTags=global_data.current_section_name.split("/");
      for(var i=0;i<global_data.index_of_current_section;i++){
         cond=false;
         for(var j=0;j<subSection.length;j++){
            for(var k=0;k<subSection[j].length;k++)
               if(subSection[j][k].definition.toString()===diffTags[i]){
                 subSection=subSection[j][k].possibleValues;
                 cond=true;
                 break;
               }
            if(cond) break;
         }
      }
      
      var new_possibleValues=[];
      cond=false;
      for(i=0;i<subSection.length;i++){
         for(j=0;j<subSection[i].length;j++){
            if(subSection[i][j].definition.toString()===this.moving_definition){
               this.moving_definition_object=subSection[i][j];
               cond=true;
               //subSection[i][j].pop();
             }else{
               new_possibleValues.push(subSection[i][j]);
             }
          }
          if(cond) break;
      }
      //subSection[i]=new_possibleValues;
      //this.draw(subSection);

      this.dragging_item=true;
    }else{
      console.log(e.target);
      e=e.target;
      while(e.tagName!=="P")
           e=e.childNodes[0];

      this.shifting_definition=e.innerHTML;
      

      if(this.shifting_definition===this.moving_definition)
         this.shifting_definition="";
      else{
      subSection=data;
      cond=false;
      diffTags=global_data.current_section_name.split("/");
      for(i=0;i<global_data.index_of_current_section;i++){
         cond=false;
         for(j=0;j<subSection.length;j++){
            for(k=0;k<subSection[j].length;k++)
               if(subSection[j][k].definition.toString()===diffTags[i]){
                 subSection=subSection[j][k].possibleValues;
                 cond=true;
                 break;
               }
            if(cond) break;
         }
      }

      var array_coloumns=[];
      var array=[];
      var key=0;
      diffTags=global_data.current_section_name.split("/");
      var child_react=React.createElement('b',{key:key++},diffTags[0]);
      array.push(child_react);
      for(i=1;i<diffTags.length;i++)
      {
          child_react=React.createElement('span',{key:key++},' / ');
          array.push(child_react);
          child_react=React.createElement('b',{key:key++},diffTags[i]);
          array.push(child_react);
      }
      var parent_react=React.createElement('p',{key:key++,id:'sectionTag'},array);
      parent_react=React.createElement('div',{key:key++,id:'tags',onClick:this.traverse},parent_react);
      array_coloumns.push(parent_react);
               
      for(i=0;i<subSection.length;i++){
         array=[];
         var p_child_react=React.createElement('p',{key:key++,align:'center'},'-');
         child_react=React.createElement('div',{key:key++,id:'add_tab'},p_child_react);
         child_react=React.createElement(Draggable,{key:key++,onDragEnter:this.dragging},child_react);
         array.push(child_react);
         for(j=0;j<subSection[i].length;j++)
         {
             if(subSection[i][j].definition.toString()===this.shifting_definition){
                 child_react=React.createElement('div',{key:key++,id:'target_drop'},"Drop Here");
                 child_react=React.createElement(Droppable,{key:key++, onDrop:this.dropped},child_react);
                 array.push(child_react);
             }
             p_child_react=React.createElement('p',{key:key++,align:'center'},subSection[i][j].definition);
             child_react=React.createElement('div',{key:key++,id:'sections_tab',onClick:this.Inc_index_of_current_section, onContextMenu:this.changeText},p_child_react);
             child_react=React.createElement(Draggable,{key:key++,onDragEnter:this.dragging},child_react);
             array.push(child_react);
         }
         p_child_react=React.createElement('p',{key:key++,align:'center'},'+');
         child_react=React.createElement('div',{key:key++,id:'add_tab',onClick:this.addDefinitions},p_child_react);
         child_react=React.createElement(Draggable,{key:key++,onDragEnter:this.dragging},child_react);
         array.push(child_react);
         parent_react=React.createElement('div',{key:key++,id:'tabs'},array);
         parent_react=React.createElement(Droppable,{key:key++, onDrop:this.dropped},parent_react);
         array_coloumns.push(parent_react);
      }
      p_child_react=React.createElement('p',{key:key++,align:'center'},'+');
      child_react=React.createElement('div',{key:key++,id:'add_tab',onClick:this.addColumns},p_child_react);
      //child_react=React.createElement(Draggable,{key:key++,onDragEnter:this.dragging},child_react);
      parent_react=React.createElement('div',{key:key++,id:'tabs'},child_react);
      //parent_react=React.createElement(Droppable,{key:key++, onDrop:this.dropped},parent_react);
      array_coloumns.push(parent_react);
      ReactDOM.render(array_coloumns,document.getElementById("main"));     

      //console.log("shifting def "+this.shifting_definition);
      //console.log("Moving def "+this.moving_definition);
      }
    }
  }

  draw(subSection){
      var array_coloumns=[];
      var array=[];
      var key=0;
      var diffTags=global_data.current_section_name.split("/");
      var child_react=React.createElement('b',{key:key++},diffTags[0]);
      array.push(child_react);
      for(var i=1;i<diffTags.length;i++)
      {
          child_react=React.createElement('span',{key:key++},' / ');
          array.push(child_react);
          child_react=React.createElement('b',{key:key++},diffTags[i]);
          array.push(child_react);
      }
      var parent_react=React.createElement('p',{key:key++,id:'sectionTag'},array);
      parent_react=React.createElement('div',{key:key++,id:'tags',onClick:this.traverse},parent_react);
      array_coloumns.push(parent_react);
               
      for(i=0;i<subSection.length;i++){
         array=[];
         var p_child_react=React.createElement('p',{key:key++,align:'center'},'-');
         child_react=React.createElement('div',{key:key++,id:'add_tab'},p_child_react);
         child_react=React.createElement(Draggable,{key:key++,onDragEnter:this.dragging},child_react);
         array.push(child_react);
         for(var j=0;j<subSection[i].length;j++)
         {
             p_child_react=React.createElement('p',{key:key++,align:'center'},subSection[i][j].definition);
             child_react=React.createElement('div',{key:key++,id:'sections_tab',onClick:this.Inc_index_of_current_section, onContextMenu:this.changeText},p_child_react);
             child_react=React.createElement(Draggable,{key:key++,onDragEnter:this.dragging},child_react);
             array.push(child_react);
         }
         p_child_react=React.createElement('p',{key:key++,align:'center'},'+');
         child_react=React.createElement('div',{key:key++,id:'add_tab',onClick:this.addDefinitions},p_child_react);
         child_react=React.createElement(Draggable,{key:key++,onDragEnter:this.dragging},child_react);
         array.push(child_react);
         parent_react=React.createElement('div',{key:key++,id:'tabs'},array);
         parent_react=React.createElement(Droppable,{key:key++, onDrop:this.dropped},parent_react);
         array_coloumns.push(parent_react);
      }
      p_child_react=React.createElement('p',{key:key++,align:'center'},'+');
      child_react=React.createElement('div',{key:key++,id:'add_tab',onClick:this.addColumns},p_child_react);
      //child_react=React.createElement(Draggable,{key:key++,onDragEnter:this.dragging},child_react);
      parent_react=React.createElement('div',{key:key++,id:'tabs'},child_react);
      //parent_react=React.createElement(Droppable,{key:key++, onDrop:this.dropped},parent_react);
      array_coloumns.push(parent_react);
      ReactDOM.render(array_coloumns,document.getElementById("main"));
  }

  render(){
     return(
     <Droppable onDragLeave={this.leaving} onDrop={this.dropped}>
     <div id="tabs">
       <Draggable onDragEnter={this.dragging}>
       <div id="sections_tab" onClick={this.Inc_index_of_current_section} onContextMenu={this.changeText}>
            <p align="center">{this.props.data[0].definition}</p>
       </div>
       </Draggable>
     </div>
     </Droppable>
     );
  }
}

export default App;
