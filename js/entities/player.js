game.PlayerEntity = me.Entity.extend({


    init: function(x, y) {

        this.direction = "right";
        this.animation = 'stand';

        var settings = {};
        settings.image = me.loader.getImage('walk_side');
        settings.width = 64;
        settings.height = 64;
        // call the constructor
        this._super(me.Entity, 'init', [x, y, settings]);

        this.renderable = new me.AnimationSheet(x,y,settings);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;

        // define a basic walking animation (using all frames)
        this.renderable.addAnimation("stand_side",  [0]);
        this.renderable.addAnimation("stand_up",  [0]);
        this.renderable.addAnimation("stand_down",  [0]);

        this.renderable.addAnimation("walk_side",  [0, 1, 2, 3, 4, 5, 6, 7]);
        this.renderable.addAnimation("walk_up",  [0, 1, 2, 3, 4, 5, 6, 7]);
        this.renderable.addAnimation("walk_down",  [0, 1, 2, 3, 4, 5, 6, 7]);

        this.renderable.addAnimation("dance1_side",  [0, 1, 2, 3, 4, 5, 6, 7]);
        this.renderable.addAnimation("dance1_up",  [0, 1, 2, 3, 4, 5, 6, 7]);
        this.renderable.addAnimation("dance1_down",  [0, 1, 2, 3, 4, 5, 6, 7]);


        this.renderable.addAnimation("carry",  [0, 1, 2]);
        // set the standing animation as default
        this.renderable.setCurrentAnimation("stand_side");
    },


    refresh: function(playerInfo) {
        this.pos.x = playerInfo.x;
        this.pos.y = playerInfo.y;

        var dir = playerInfo.direction;

        this.renderable.flipX(dir == "left");

        if(dir == "left" || dir == "right") {
            dir = "side";
        }

        var animName = playerInfo.animation + "_" + dir;
        this.trySetAnim(animName);
    },


    trySetAnim:function(animName) {

        if (!this.renderable.isCurrentAnimation(animName)) {
            console.log("anim: " + animName);
            this.renderable.setCurrentAnimation(animName);
        }
    },

})
