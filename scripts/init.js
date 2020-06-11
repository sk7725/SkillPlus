//var ui = require("ui-lib/library");
const damagedColor = Color.valueOf("ffa5a5");

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

const radius = 8;

const hpring = extend(Packages.arc.scene.style.Drawable, {
  last:1,
  lastframe:0,
  hpscl(f){
  	this.last = Mathf.lerp(this.last, f, 0.1);
  	return this.last;
  },
  draw(x, y, w, h){
    var hp = Vars.player.health()/Vars.player.maxHealth();
    if(hp > 0.99999) return;
    if(!Mathf.equal(hp, this.last)) this.lastframe = Time.time();
    var scl = this.hpscl(hp);

    var a = (60 - (Time.time() - this.lastframe))/60;
    if(a <= 0) return;
    Lines.stroke(radius);
    //print("trydraw "+w/2+", "+h/2);
    var cv = Core.input.mouseScreen(Vars.player.getX(),Vars.player.getY());
    Draw.color(Color.darkGray, a);
    Lines.circle(cv.x, cv.y, 64);
    if(hp < scl){
      Draw.color(damagedColor, a);
      Lines.polySeg(360, 360*hp, 360*scl, cv.x, cv.y, radius*8, 0);
    }
    else this.last = hp;
    Draw.color(Pal.health, a);
    Lines.polySeg(360, 0, 360*hp, cv.x, cv.y, radius*8, 0);
    Lines.stroke(1);
    Draw.color();
    Draw.reset();
  }
});

var t = this;

const hpskillring = extend(Packages.arc.scene.style.Drawable, {
  last:1,
  last2:1,
  lastframe:0,
  hpscl(f){
  	this.last = Mathf.lerp(this.last, f, 0.1);
  	return this.last;
  },
  skillscl(f){
  	this.last2 = Mathf.lerp(this.last2, f, 0.05);
  	return this.last2;
  },
  draw(x, y, w, h){
    var hp = Vars.player.health()/Vars.player.maxHealth();
    if(hp < 0.00001) return;

    var skill = null;
    var cd = 0;
    try{
      if(t.global.skilltile != null) skill = Vars.world.tile(t.global.skilltile).ent().skill();

      if(skill != null && skill.skill != ""){
        var cool = t.global.skills.skills[skill.skill].cooltime*60;
        cd = 1 - (cool + skill.lastused - Time.time())/cool;
        if(cd<0) cd = 0;
        if(cd>1) cd = 1;
      }
    }
    catch(err){
      skill = null;
      cd = 0;
    }

    //if(!Mathf.equal(hp, this.last) || (skill != null && skill.skill != "" && !Mathf.equal(cd, 1))) this.lastframe = Time.time();
    var scl = this.hpscl(hp);


    //var a = (60 - (Time.time() - this.lastframe))/60;
    var a = 0.5;
    //if(a <= 0.4) a = 0.4;
    Lines.stroke(radius);
    //print("trydraw "+w/2+", "+h/2);
    var cv = Core.input.mouseScreen(Vars.player.getX(),Vars.player.getY());
    Draw.color(Color.darkGray, a);
    Lines.polySeg(360, -50, 170, cv.x, cv.y, radius*8, 0);
    Lines.polySeg(360, 190, 290, cv.x, cv.y, radius*8, 0);
    if(hp < scl){
      Draw.color(damagedColor, a);
      Lines.polySeg(360, 220*hp-50, 220*scl-50, cv.x, cv.y, radius*8, 0);
    }
    else this.last = hp;

    Draw.color(Pal.health, a);
    Lines.polySeg(360, -50, 220*hp-50, cv.x, cv.y, radius*8, 0);

    if(skill != null && skill.skill != ""){
      var scl2 = this.skillscl(cd);
      if(cd < scl2){
        Draw.color(Pal.accent, a);
        Lines.polySeg(360, 100*cd+190, 100*scl2+190, cv.x, cv.y, radius*8, 0);
      }
      else this.last2 = cd;

      Draw.color(Pal.heal, a);
      Lines.polySeg(360, 190, 100*cd+190, cv.x, cv.y, radius*8, 0);
    }
    if(Vars.player.hasEffect(t.global.shieldcomp.small)){
      var shp = t.global.shieldcomp.small._shieldhp[Vars.player.id];
      if(shp > 0){
        Draw.color(Pal.lightGray, a);
        Lines.stroke(radius/2);
        Lines.polySeg(360, 0, shp / 3, cv.x, cv.y, radius*8.5, 0);
      }
    }
    else if(Vars.player.hasEffect(t.global.shieldcomp.large)){
      var shp = t.global.shieldcomp.large._shieldhp[Vars.player.id];
      if(shp > 0){
        Draw.color(Pal.lightGray, a);
        Lines.stroke(radius/2);
        Lines.polySeg(360, 0, shp / 3, cv.x, cv.y, radius*8.5, 0);
      }
    }

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
    t.addImage(hpskillring);
		t.visible(boolp(() => Vars.state.state == GameState.State.playing));
		//t.defaults().width(Core.graphics.getWidth()).height(Core.graphics.getHeight());

		Core.scene.add(t);
	}));
}
