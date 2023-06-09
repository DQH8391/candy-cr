import { _decorator, Component, Label, log, Node } from 'cc';
const { ccclass, property } = _decorator;

import { Circle } from "./Circle";
import { GameField } from "./GameField";

@ccclass('GamesController')
export class GameController extends Component {
    @property
    countTypeAndMove: number = 12;
    private allpoints: number = 0;
    @property(Label)
    taskType: Label | null = null;
    private taskpoints: number = 0;
    @property(Label)
    currentMove: Label | null = null;
    private movepoints: number = 0;
    @property
    testGame: boolean = true;
    @property(Label)
    textPoint: Label | null = null;
    @property(GameField)
    gameField: GameField = null;
    @property(Node)
    gameOver: Node | null = null;
    @property(Node)
    gameWon: Node | null = null;
    @property(Node)
    typeTask: Node | null = null;
    @property(Node)
    testGameText: Node | null = null;
    @property(Node)
    blockField: Node | null = null;
    onLoad() {

        if(this.testGame) {
        this.testGameText.active=true;
        }

        this.taskpoints = Number(this.taskType.string);
        this.movepoints = Number(this.currentMove.string);

        this.node.on('moveCircleEnd', this.gameField.createOneLineCircles, this.gameField);
        this.node.on('moveCircleEnd', function (event) {
        event.stopPropagation();
        });

        this.node.on('clickOnCellForDestroyCircle', this.gameField.clickDestroyCircleInCell, this.gameField);
        this.node.on('clickOnCellForDestroyCircle', function (event) {
        event.stopPropagation();
        });

        this.node.on('destroyCircles', this.gameField.allCirclesMove, this.gameField);
        this.node.on('destroyCircles', function (event) {
        event.stopPropagation();
        });

        this.node.on('needCheckField', this.gameField.checkLine, this.gameField);
        this.node.on('needCheckField', function (event) {
        event.stopPropagation();
        });

        this.node.on('setPoint', this.setPoint, this);
        this.node.on('setPoint', function (event) {
        event.stopPropagation();
        });


        this.node.on('getDestroyCirclesType', this.gameField.getTypeDestroyCircle, this.gameField);
        this.node.on('getDestroyCirclesType', function (event) {
        event.stopPropagation();
        });

        this.node.on('setDestroyCirclesType_', this.setTypeDestroyCircle, this);
        this.node.on('setDestroyCirclesType_', function (event) {
        event.stopPropagation();
        });

        this.node.on('countProgressStep', this.countProgressStep, this);
        this.node.on('countProgressStep', function (event) {
        event.stopPropagation();
        });
        this.node.on('countProgressDestrCirles', this.countProgressStep, this);
        this.node.on('countProgressDestrCirles', function (event) {
        event.stopPropagation();
        });


    }
    private setPoint() {
        this.allpoints += 1;
        this.textPoint.string = this.allpoints.toString();

    }
/*
    setBuster() {
        this.gameField.
    }
*/
    private countProgressStep() {

        this.movepoints--;
        log(this.movepoints)
        this. currentMove.string = String(this.movepoints);
        if (!this.testGame) {
        if (this.movepoints==0) {
        this.gameOver.active = true;
        }
        }

    }
    progressTargetDestoyCircle(){

        var circleTask = this.typeTask.getComponent(Circle);
        var countDestroyersTaskCircles = this.countTypeAndMove - this.gameField.destroyTipeColors[circleTask.CircleTypeColor];
        this.taskType.string = String(countDestroyersTaskCircles);
        if (!this.testGame) {
        if (countDestroyersTaskCircles<=0){
        this.gameWon.active = true;
        }
        }
    }
    gameOverNodeDeActivate(){
        this.gameOver.active = false;
    }
    gameWonNodeDeActivate(){
        this.gameWon.active = false;
    }
    private CheckGameOverIfColorChallengeIsComplete(){

    }
    RestartGame() {

        this.gameField.node.active = false;
        this.gameField.node.active = true;
        this.allpoints = 1;
        this.textPoint.string = this.allpoints.toString();
        this.movepoints = this.countTypeAndMove;
        this.taskType.string = this.countTypeAndMove.toString();
        this.currentMove.string = this.countTypeAndMove.toString();
        var circleTask = this.typeTask.getComponent(Circle);
        circleTask.setRandomColor();

    }
    setTypeDestroyCircle() {
        this.progressTargetDestoyCircle();
    }
}


