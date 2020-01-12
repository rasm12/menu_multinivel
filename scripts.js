
// (function (){

    
//     let url = 'http://www.apiv3.local.com/test-menu';
//     console.log('url', url)
//     let xhr = new XMLHttpRequest();
//     xhr.open('get', url,false);
//     xhr.send();

//     let json = JSON.parse(xhr.responseText)
//     console.log('menu', JSON.stringify(json,null,'\t'))
//     // let div = document.getElementById('response')
//     // let tbody = document.getElementById('body_table')
//     // let t = document.getElementsByClassName('cuerpo')


//     // //tbody.innerHtml += '<tr> <td> Fila 1</td><td> Fila 2</td> </tr>';

//     // var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];

//     // //tableRef.innerHTML += '<tr><td>celda 1</td><td>celda 2</td></tr>'

//     // let html = ''

    



//     // json.forEach(element => {
        
//     //     if(element.parent == 0){
//     //         //buscar todos sus hijos
//     //        html += '<tr><td>' + element.label +'</td><td><ul>'
//     //         json.forEach(e => {
//     //             // hijos
//     //             if(e.parent == element.id){
//     //                 html += '<li>' + e.label + '</li>'
//     //             }
//     //         })

//     //         html += '</ul></td></tr>'
//     //     } else {

//     //     }
//     // });

//     // tableRef.innerHTML = html



// })()

let menu = null;
let parents = null;
let childs = null;
let levelString = ['L0'];



(function(){
    let url = 'http://www.apiv3.local.com/test-menu';
    let xhr = new XMLHttpRequest();
    xhr.open('get', url,false);
    xhr.send();
    menus = JSON.parse(xhr.responseText)

    let level = 0;

    menus.forEach( (menu, index) => {
        if(menu.parent == 0) {
            console.log(`${levelSpaces(level)}  ${menu.label}`)
            searchChilds(menu.id, index, level + 1)
        }
    })

    // console.log(JSON.stringify(levelString))
    


})()

function searchChilds(parent_id, index_from, level){
    let newLevel = `L${level}`;
    let ifExisteLevel = levelString.findIndex(e => e == newLevel);
    if(ifExisteLevel == -1){
        levelString.push(newLevel)
    }
    for(let index = index_from; index < menus.length; index++){
        if(menus[index].id != parent_id){
            if(menus[index].parent == parent_id){
                console.log(` ${levelSpaces(level)} ${levelString[level]} * ${menus[index].label}`)
                searchChilds(menus[index].id, index, level + 1)
            }
        }
    }

    // console.log(`Fin buscar hijos de ${parent_id} - Nivel ${level}`)
}

function levelSpaces(level){
    let spaces = '';
    level *= 2
    for(let s = 0; s < level; s++){
        spaces += '--';
    }

    return spaces;
}