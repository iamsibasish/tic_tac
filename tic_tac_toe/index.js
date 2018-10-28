/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let hum_play = [];
let comp_play = [];
let empty_spots = [0,1,2,3,4,5,6,7,8]
let simple_l =true


//player == 1 ---->human
//player == 2 ---->Bot
const gamemap = {'00':0,'01':1,'02':2,'10':3,'11':4,'12':5,'20':6,'21':7,'22':8}
const gamemap_rev = {0:[0,0],1:[0,1],2:[0,2],3:[1,0],4:[1,1],5:[1,2],6:[2,0],7:[2,1],8:[2,2]}
const win_comb = [ [3, 4, 5],[0, 3, 6],[0, 4, 8],[6, 4, 2],[0, 1, 2],[1, 4, 7],[6, 7, 8],[2, 5, 8]]


function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}


function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {

    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if (grid[colIdx][rowIdx] === 0 )
    {
        let newValue ;
        if (turn === 'X'){
            newValue= 1
            turn = 'O'
        grid[colIdx][rowIdx] = newValue;
       
        logmoves(turn === 'X'?2:1,gamemap[colIdx+''+rowIdx])
        renderMainGrid();
        addClickHandlers();

        }

        let win_dic = computewin(turn === 'X'?2:1);
        if (win_dic){
            endgame(win_dic);
        }
        else{
            if (hum_play.length+comp_play.length === 9){
                draw();
             }
             else{
                    //Chance for bot
                    if (turn === 'O'){
                            compuMove();
                            turn = "X";
                            //logmoves(turn === 'X'?2:1,gamemap[colIdx+''+rowIdx])
                            let win_dic = computewin(turn === 'X'?2:1);
                            if (win_dic){
                                endgame(win_dic);
                            }
                            else{
                                if (hum_play.length+comp_play.length === 9){
                                    draw();
                                 }
                            }

                    }


             }
        }
        
        //make the computer make the move here
        /*
        if (turn === 'O'){
             compuMove();
            turn = "X";
        }*/  
    }
    else if (grid[colIdx][rowIdx] === 1 ){
        alert('Already taken by Human,Try other blank squares.');

    }
    else{
        alert('Already taken by Computer.Try other blank squares.');
    }
}

function compuMove(){
    var spot;
    if(simple_l){
         spot = empty_spots[0]
    }
    else{
        spot = complexLogic(comp_play,empty_spots,hum_play,2).spot
       
    }

    spot = gamemap_rev[spot]

    grid[spot[0]][spot[1]]  = 2
    renderMainGrid();
    logmoves(2,gamemap[spot[0]+''+spot[1]])
    addClickHandlers();
}


function computWinDiff(moves,player){
        let return_value = null;
        let find = false;
        for (let [index, ent] of win_comb.entries()) {
                for(let i=0; i < GRID_LENGTH; i++) {
                         if (moves.indexOf(ent[i]) > -1){
                            find = true;
                         }
                         else{
                            find = false;
                            break ;
                         }       
                }
                if (find){
                    return_value={'player':player,'win_index':index}
                    break
                }
        }
        return return_value;

}



function computewin(player){
    let return_value = null;

    let player_all_postions = player === 1?hum_play:comp_play
    let find = false;
    for (let [index, ent] of win_comb.entries()) {
            for(let i=0; i < GRID_LENGTH; i++) {
                     if (player_all_postions.indexOf(ent[i]) > -1){
                        find = true;
                     }
                     else{
                        find = false;
                        break ;
                     }       
            }
            if (find){
                return_value={'player':player,'win_index':index}
                break
            }
    }

    return return_value;
}

function logmoves(player,move){

    if (player === 1){
        hum_play.push(move);

    }
    else{
        comp_play .push(move);
    }
    

    var index = empty_spots.indexOf(move);
    if (index > -1) {
        empty_spots.splice(index, 1);
    }

}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}


function init_allvlaue(){
    turn = 'X';
    hum_play = [];
     comp_play = [];
     simple_l = true;
     empty_spots = [0,1,2,3,4,5,6,7,8]
     for (let i = 0;i < GRID_LENGTH; i++)
     {
        grid.pop()
     } 

}


function endgame(win_dic){
    let player = win_dic.player === 1?"Human":"Bot";
    alert(player+ " wins.");
    removeListners();
   
 //startgame();
}
function draw(){
alert("The Game Is draw");
removeListners();

}
function removeListners(){
     var boxes = document.getElementsByClassName("box");
      for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].removeEventListener('click', onBoxClick, false);
    }
}


function complexLogic(c_p,e_s,h_p,player){   // compute all possible steps and  weight the moves and depending upon weight decide best move 
   
    if (computWinDiff(c_p,2)){ // bot win 
            
            return {score: 10};
    }
    else if(computWinDiff(h_p,1)){ // human win
             
            return {score: -10};
    }
    else if (e_s.length === 0){ // draw 
        
        return {score:0};
    }
    var score_array=[]
    for (var i = 0; i < e_s.length; i++) {
                var score={}
                var new_empty = []
                for (j=0;j<e_s.length;j++){
                    if(e_s[i]!=e_s[j]){
                        new_empty.push(e_s[j])
                    }
                }
                var new_comp_play=[]
                for (j=0;j<c_p.length;j++){
                        new_comp_play.push(c_p[j])
                }
                var new_hum_play = []
                for (j=0;j<h_p.length;j++){
                        new_hum_play.push(h_p[j])
                }

                if (player === 1){
                        new_hum_play.push(e_s[i]);   
                        var result = complexLogic(new_comp_play,new_empty,new_hum_play,2);
                        score.score = result.score;


                }
                else{
                     new_comp_play.push(e_s[i]);
                     var result = complexLogic(new_comp_play,new_empty,new_hum_play,1);
                     score.score = result.score;
                }
                score.spot = e_s[i]
                score_array.push(score)

    }

    var select_move
    if (player === 1){
        var select_score = 9839282;
        for (var i = 0; i < score_array.length; i++){
            if (score_array[i].score < select_score) {
                    select_score = score_array[i].score;
                    select_move = i;
            }
        }
    }
    else{
        var select_score = -9839282;
            for (var i = 0; i < score_array.length; i++){
                if (score_array[i].score > select_score) {
                        select_score = score_array[i].score;
                        select_move = i;
                    }
            }
    }

    return score_array[select_move]
}

function setDiff(dif){

    if (dif === 'easy'){
        simple_l = true

    }
    else{
        simple_l = false

    }
    document.querySelector(".diff").style.display = "none";
    document.querySelector(".game").style.display = "block";

}

function startGame(){
document.querySelector(".game").style.display = "none";
document.querySelector(".diff").style.display = "flex";
removeListners();
init_allvlaue()
initializeGrid();
renderMainGrid();
addClickHandlers(); 

}
initializeGrid();
console.log(grid);
renderMainGrid();
addClickHandlers();  






