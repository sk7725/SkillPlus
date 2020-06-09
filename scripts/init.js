//var ui = require("ui-lib/library");
var frag;

if (typeof(drawrect)== "undefined"){
  const drawrect = method => new Packages.arc.scene.ui.layout.Table.DrawRect(){get : method};
}

if(!this.global.skillPlusUI){
  this.global.skillPlusUI = true;
  Events.on(EventType.ClientLoadEvent, run(e => {
    print("loading start!");
    frag = extend(Fragment, {
  		build(parent) {

  			elem = parent.fill(drawrect((x, y, w, h)=>{
          //Draw goes here
          w = Core.graphics.getWidth();
          h = Core.graphics.getHeight();
          Draw.color(Color.valueOf("ff0000"));
          Lines.stroke(3);
          //print("trydraw");
          Lines.polySeg(360, 0, (360/Vars.player.maxHealth())*Vars.player.health(), x, y, 11, 0);
          Lines.stroke(1);
          Draw.color();
          Draw.reset();
  			}));
        elem.visible(boolp(()=>!Vars.state.is(GameState.State.menu)));
        elem.update(run(() => {
          elem.setFillParent(true);
          elem.setBounds(0, 0, Core.graphics.getWidth(), Core.graphics.getHeight());
        }));
        elem.touchable(Touchable.disabled);
  		}
  	});
    frag.visible = true;
  	frag.build(Vars.ui.hudGroup);
	}));
}
