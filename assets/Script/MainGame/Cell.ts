import { _decorator, Color, Component, log, Node, size } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Cell')
export class Cell extends Component {
    @property

    color : Node;
    _circle : Node = null;
    generator: boolean = false;
    irow: number = 0;
    jcolumn: number = 0;
    TypeColor: typeColor = 0;
    typeCell: typeCell = 0;
    wasSelectCircle: boolean = false;
    wasClick: boolean = false;
    onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.wasClickSet, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.moveCircle, this);
    }
    wasClickSet() {
        if (this._circle != null) {
        this.wasClick =true;

        log("clicedInCell")
        this.selectCircle();
        }
    }
    start() {

    }
    moveCircle(){
        log("circle is move")
    }
    setGrayColor() {
         new Color(197, 197, 197);
    }
    setWhiteColor() {
        new Color(255, 255, 255);
    }
    setColorInType() {
        if (this.typeCell == 1) this.setWhiteColor();
    }
    countClick: number = 0;
    selectCircle() {
        if (this._circle == null) return;
        this.countClick++;
        if (this.countClick % 2 == 0) {
        this.wasSelectCircle = false;
        this.wasClick = false;
        this.setNormalSize();
        this.node.dispatchEvent(new Event.EventCustom('wasTwoClickOnCell', true));
        } else {
        this.wasSelectCircle = true;
        this.node.dispatchEvent(new Event.EventCustom('wasClickOnCell', true));
        this._circle.setContentSize(this.node.getContentSize());
        }
    }
    setNormalSize() {
        if (this._circle == null) return;
        var oldSize = size(this.node.getContentSize());
        this._circle.setContentSize(oldSize.height - 15, oldSize.width - 15);
    }
    mousedown() {
        this.wasClick = true;
        this.destroyCircle();

    }
    destroyCircle() {
        if (this._circle != null) {
        this._circle.destroy();
        this._circle = null;
        this.node.dispatchEvent(new Event.EventCustom('clickOnCellForDestroyCircle', true));
        }
    }
    circleIsNotNull() {
        if (this._circle != null) return true;
        return false;
    }
    CellIsNotNull() {
        if (this != null) return true;
        return false;
    }
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually

const { ccclass, property } = cc._decorator;

@ccclass
export class Cell extends cc.Component {

    @property
    generator: boolean = false;

    irow: number = 0;

    jcolumn: number = 0;

    TypeColor: typeColor = 0;

    typeCell: typeCell = 0;

    _circle: cc.Node = null;

    wasSelectCircle: boolean = false;

    wasClick: boolean = false;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.wasClickSet, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.moveCircle, this);
    }

    wasClickSet() {
        if (this._circle != null) {
            this.wasClick =true;
           
            cc.log("clicedInCell")
            this.selectCircle();
        }
    }

    start() {

    }

    moveCircle(){
        cc.log("circle is move")
    }

    setGrayColor() {
        this.node.color = new cc.Color(197, 197, 197);
    }

    setWhiteColor() {
        this.node.color = new cc.Color(255, 255, 255);
    }

    setColorInType() {
        if (this.typeCell == 1) this.setWhiteColor();
    }

    countClick: number = 0;

    selectCircle() {
        if (this._circle == null) return;
        this.countClick++;
        if (this.countClick % 2 == 0) {
            this.wasSelectCircle = false;
            this.wasClick = false;
            this.setNormalSize();
            this.node.dispatchEvent(new cc.Event.EventCustom('wasTwoClickOnCell', true));
        } else {
            this.wasSelectCircle = true;
            this.node.dispatchEvent(new cc.Event.EventCustom('wasClickOnCell', true));
            this._circle.setContentSize(this.node.getContentSize());
        }
    }

    setNormalSize() {
        if (this._circle == null) return;
        var oldSize = cc.size(this.node.getContentSize());
        this._circle.setContentSize(oldSize.height - 15, oldSize.width - 15);
    }
    mousedown() {
        this.wasClick = true;
        this.destroyCircle();

    }

    destroyCircle() {
        if (this._circle != null) {
            this._circle.destroy();
            this._circle = null;
            this.node.dispatchEvent(new cc.Event.EventCustom('clickOnCellForDestroyCircle', true));
        }
    }

    circleIsNotNull() {
        if (this._circle != null) return true;
        return false;
    }


    CellIsNotNull() {
        if (this != null) return true;
        return false;
    }

}
*/
