var ui = require("ui-lib/library");

if (typeof(drawrect)== "undefined"){
  const drawrect = method => new DrawRect(){get : method};
}

ui.once(() => {
  frag = extend(Fragment, {
		build(parent) {

			elem = parent.fill(drawrect((x, y, w, h)=>{
        //Draw goes here
        var cx = Core.graphics.getWidth()/2;
        var cy = Core.graphics.getHeight()/2;
        Draw.color(Color.valueOf("ff0000"));
        Lines.stroke(3);
        Lines.polySeg(360, 0, (360/Vars.player.maxHealth())*Vars.player.health(), Vars.player.getX(), Vars.player.getY(), 11, 0);
        Lines.stroke(1);
        Draw.color();
			}));
      elem.visible(boolp(()=>Vars.state.is(GameState.State.menu)));
      elem.update(run(() => {

      }));
      elem.touchable(Touchable.disabled);
		}
	});
	frag.build(Vars.ui.hudGroup);

	// Only hook event to rebuild once
  /*
	Events.on(EventType.WorldLoadEvent, run(() => {
		//frag.rebuild();
	}));
  */
});
