
var TicTacToeLayer = cc.LayerColor.extend({
    board:null,
    xIsPlaying: true,
    boardData:[[-1,-1,-1],
               [-1,-1,-1],
               [-1,-1,-1]],
    cellLocation:[[{x:113,y:360},{x:226,y:360},{x:360,y:360}],
                  [{x:113,y:240},{x:226,y:240},{x:360,y:240}],
                  [{x:113,y:113},{x:226,y:113},{x:360,y:113}]],
    verifyWinner: function(){

    },
    handleTouch:function(touch, event){
        var point = touch.getLocation();
        var self = event.getCurrentTarget();
        cc.log(point);
        var cell = self.getCell(point);
        if(self.boardData[cell.i][cell.j] === -1){
            self.boardData[cell.i][cell.j] = self.xIsPlaying ? 1 : 0;
            self.drawPlay(cell);
        }        
    },
    getCell:function (point){
        for(var i = 2 ; i >= 0 ; i--){
            for(var j = 0 ; j < 3 ; j++){
                if(point.x <= this.cellLocation[i][j]['x'] && point.y <= this.cellLocation[i][j]['y'] ){
                    cc.log("i="+i+", j="+j);
                    return {i:i, j:j, x:this.cellLocation[i][j]['x'], y:this.cellLocation[i][j]['y']};
                }
            }                  
        }
        cc.log('Cell not found, point: ' + point);
        return null;
        
    },
    drawPlay:function (point){
        if(point === null){
            return null;
        }
        point.x = point.x - 113;
        cc.log('drawPlay');
        var player = new cc.Sprite(this.xIsPlaying ? res.x : res.o);
        player.setAnchorPoint(0,1);
        player.setPosition(point);
        this.addChild(player,0);
        this.xIsPlaying = !this.xIsPlaying;
        
    },
    touchInit:function () {
      cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          onTouchBegan: this.handleTouch
      },this);          
    },
    ctor:function () {
        this._super();
        this.init( cc.color(0,128,255,255) );
        var size = cc.winSize;
        this.board = new cc.Sprite(res.board);
        this.board.setPosition( size.width / 2, size.height / 2);
        this.addChild(this.board, 0); 
        this.touchInit();
        return true;
    }
});

var TicTacToeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new TicTacToeLayer();
        this.addChild(layer);
        
    }
});

