//var ui = require("ui-lib/library");
var frag;

if (typeof(drawrect)== "undefined"){
  const drawrect = method => new Packages.arc.scene.ui.layout.Table.DrawRect(){get : method};
}
/*
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
          //print("trydraw "+w/2+", "+h/2);
          Lines.polySeg(360, 0, (360/Vars.player.maxHealth())*Vars.player.health(), w/2, h/2, 11, 0);
          Lines.stroke(1);
          Draw.color();
          Draw.reset();
  			}));
        elem.visible(boolp(()=>true));
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
*/

const hpring = extend(Packages.arc.scene.style.Drawable, {
  draw(x, y, w, h){
    Draw.color(Color.valueOf("ff0000"));
    Lines.stroke(3);
    //print("trydraw "+w/2+", "+h/2);
    Lines.polySeg(360, 0, 360*(Vars.player.health()/Vars.player.maxHealth()), Vars.player.getX(), Vars.player.getY(), 11, 0);
    Lines.stroke(1);
    Draw.color();
    Draw.reset();
  }
});
/*
var last = 0;

const hpring = () => {
	var hp = Vars.player.health()/Vars.player.maxHealth();
	const avg = Mathf.lerp(hp, last, 1/60);
	last = hp;
	return avg;
};*/

// Prevent adding multiple speedometers
if (!this.global.skillPlusUI) {
	this.global.skillPlusUI = true;

	Events.on(EventType.ClientLoadEvent, run(e => {
		const t = new Table();
    //const d = new Packages.arc.scene.ui.layout.Table.DrawRect();
    //d.draw()
		t.setFillParent(true);
    t.addImage(hpring);
		t.visible(boolp(() => Vars.state.state == GameState.State.playing));
		t.defaults().width(Core.graphics.getWidth()).height(Core.graphics.getHeight());

		Core.scene.add(t);
	}));
}
