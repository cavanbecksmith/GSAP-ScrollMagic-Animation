var CULTURE_PAGE = {
  controller: new ScrollMagic.Controller(),
  tl: new TimelineMax({paused: false, force3D: true}),
  container: $('._3_mobiles'),
  phones: {
    el: $('.phone'),
    originalW: 240,
    originalH: 480,
    newW: null,
    newH: null,
    centerW: null
  },
  browserWin: {
    el: $('._1_browser_window'),
    marginT: null,
    originalW: null,
    originalH: null,
    centerW: null
  },
  icons: {
    els: $('.icon'),
    img: $('.icon img'),
    el: $('.icon_set_1'),
    centerH: null
  },
  VRGoggles: {
    el: $('.VRGoggles'),
    marginT: null,
    originalW: null,
    originalH: null
  },
  devices: {
      small: {
        size: 500,
        percentage: 0.40
      },
      medium: {
        size: 650,
        percentage: 0.60
      }
  },
  mobile: null,
  scrolling: {
    isScrolling: null,
    currentAnim: -1,
    maxAnim: 5,
    scrollPositions: []
    // TOP
    // $('._3_mobiles').offset().top+79
  },
  init: function(){
    this.setupTimeline();
    this.setupScenes();
  },
  resize: function(){
    //--- SCENE - Mobiles
    this.isMobile();
    this.getPhonesCenter();
    this.setPhoneCenter();
    //--- SCENE - Browser window
    this.setBrowserWin();
    this.resetBrowserWin();
    //--- SCENE - Icons
    this.centerIconsH();
    this.resetIcons();
    //--- SCENE - VR Goggles zoom
    this.setVRGoggles();
    //--- SCENE - Setup Final Transition
    this.setFinalTransition();
    // this.isReady = true;
    // this.centerIconsFinalH();
    if(this.scene){
      ScrollMagic.update()
    }
  },
  setupScenes: function(options){

    // CUSTOM SCROLL FUNCTION WHICH LOCKS ON SCROLL
    this.controller.scrollTo(function(target) {
        console.log('ScrollTo function')
        TweenMax.to(window, 1, {
            scrollTo : {
                y : target, // scroll position of the target along y axis
                autoKill : true // allows user to kill scroll action smoothly
            },
            ease : Cubic.easeInOut,
            // onComplete: callback
        });
        setTimeout(function(){
          // console.log('Animation complete');
          CULTURE_PAGE.scrolling.isScrolling = false;
          $.scrollLock( false );
          // CULTURE_PAGE.controller.enabled(true);
        },1100)
    });

    // CREATE SCENE
    this.scene = new ScrollMagic.Scene({
      triggerElement: $('.trigger'),
      duration: 2000
    })

    // SETUP SCENE
    this.scene
    .setTween(this.tl)
    .addIndicators()
    .setPin($('._3_mobiles_pin'))
    .addTo(this.controller)
    .reverse(true)
    .offset(500);

    // GET EACH SCENES SCROLL POSITION RELATIVE TO PINED CONTAINER
    this.scrolling.scrollPositions[0] = this.scene.scrollOffset()+276;
    this.scrolling.scrollPositions[1] = this.scene.scrollOffset()+621;
    this.scrolling.scrollPositions[2] = this.scene.scrollOffset()+956;
    this.scrolling.scrollPositions[3] = this.scene.scrollOffset()+1318;
    this.scrolling.scrollPositions[4] = this.scene.scrollOffset()+1632;
    this.scrolling.scrollPositions[5] = this.scene.scrollOffset()+1979


    // IF MOBILE USE SNAP TO SCROLL
    if(!this.mobile){
      // this.scene.on("progress", this.snapToScroll)
    }
  },
  setupTimeline: function(){

    // SETUP ANIMATION PLAYTHROUGH
    this.tl
      .addLabel('Start')
      .to({},2,{})
      .addLabel('TransitionTo3')
      .to({},2,{})
      .addLabel('CollapsePhones')
      .to({},2,{})
      .addLabel('MobileZoom')
      .to({},0.1,{})
      .addLabel('IconsIn')
      .to({},2,{})
      .addLabel('ZoomVRGoggles')
      .to({},2,{})
      .addLabel('FinalTransition')

    this.setPhoneCenter('Start');
    this.splitPhones('TransitionTo3');
    this.collapsePhones('CollapsePhones');
    this.mobileZoom('MobileZoom');
    this.iconsIn('IconsIn');
    this.zoomVRGoggles('ZoomVRGoggles');
    this.finalTransition('FinalTransition');

    this.tl.progress(1).progress(0);
    return this.tl;

    // return tl;
  },
  isMobile:function(){
    var percentage = 0.80;
    var winW = $(window).width();
    var devices = {
      small: {
        size: 500,
        percentage: 0.6
      },
      medium: {
        size: 650,
        percentage: 0.60
      }
    }
    var $this = this;
    this.mobile = this.detectmob();
    if(winW < devices.small.size){
      $this.phones.el.css({
        'width': $this.phones.originalW*devices.small.percentage,
        'height': $this.phones.originalH*devices.small.percentage
      })
      $this.phones.newW = $this.phones.originalW*devices.small.percentage;
      $this.phones.newH = $this.phones.originalH*devices.small.percentage;
    }
    else if(winW < devices.medium.size){
      $this.phones.el.css({
        'width': $this.phones.originalW*devices.medium.percentage,
        'height': $this.phones.originalH*devices.medium.percentage
      })
      $this.phones.newW = $this.phones.originalW*devices.medium.percentage;
      $this.phones.newH = $this.phones.originalH*devices.medium.percentage;
    }
    else{
      $this.phones.el.css({
        'width': $this.phones.originalW,
        'height': $this.phones.originalH
      })
      $this.phones.newW = $this.phones.originalW;
      $this.phones.newH = $this.phones.originalH;
    }
  },
  detectmob:function() { 
   if( navigator.userAgent.match(/Android/i)
   || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPad/i)
   || navigator.userAgent.match(/iPod/i)
   || navigator.userAgent.match(/BlackBerry/i)
   || navigator.userAgent.match(/Windows Phone/i)
   ){
      return true;
    }
   else {
      return false;
    }
  },
  getPhonesCenter:function(){
    // Centers the first scene phones
    var screenW = $('._3_mobiles').width();
    var screenH = $('._3_mobiles').height();
    var w = this.phones.el.width();
    var h = this.phones.el.height();

    this.phones.centerW = (screenW-w)/2;
    this.phones.centerH = (screenH-h)/2;
    return {width:this.phones.centerW, height:this.phones.centerH};
  },
  setPhoneCenter:function(where){
    TweenMax.set(this.phones.el, {left: this.phones.centerW});
  },
  splitPhones:function(where){
    var $this=this;
    var phonePos = this.getSplitPhones();
    this.phones.el.each(function(i){
      $this.tl.to($(this), 1, {left: phonePos[i].transitionTo}, where);
    });
  },
  collapsePhones:function(where){
    var browser = this.browserWin.el;
    var browserH = this.browserWin.originalH;
    var browserW = this.browserWin.originalW;
    var browserM = this.browserWin.marginT;

    var phoneH = this.phones.el.height();
    var phoneM = this.phones.el.css('margin-top').replace('px','');

    var padding = 24;
    var marginTransition = Number;
    var winW = $(window).width();

    if(winW < this.devices.small.size){
      marginTransition = Number(browserH)+Number(browserM-(phoneH/1.25)-padding);
      this.tl.to(this.phones.el, 1, {
        css:{
          width: this.phones.newW/1.25,
          height: this.phones.newH/1.25,
          left: 0+18,
          marginTop: marginTransition
        }
      }, where)
      .to(this.browserWin.el, 1, {css:{width: '100%', height: 'auto', marginTop: browserM}}, where);
    }
    else if(winW < this.devices.medium.size){
      marginTransition = Number(browserH)+Number(browserM-(phoneH/1.3)-padding);
      this.tl.to(this.phones.el, 1, {
        css:{
          width: this.phones.newW/1.3,
          height: this.phones.newH/1.3,
          left: 0+18,
          marginTop: marginTransition
        }
      }, where)
      .to(this.browserWin.el, 1, {css:{width: '100%', height: 'auto', marginTop: browserM}}, where);
    }
    else{
      marginTransition = Number(browserH)+Number(browserM-(phoneH/2)-padding);
      this.tl.to(this.phones.el, 1, {
        css:{
          width: this.phones.newW/2,
          height: this.phones.newH/2,
          left: 0+18,
          marginTop: marginTransition
        }
      }, where)
      .to(this.browserWin.el, 1, {css:{width: '100%', height: 'auto', marginTop: browserM}}, where);
    }

    // Returns Timeline props
    return this.tl;
  },
  mobileZoom:function(where){
    this.tl
      .set(this.phones.el[0], {autoAlpha: 0}, where)
      .set(this.phones.el[2], {autoAlpha: 0}, where)
      .to(this.browserWin.el, 1, {autoAlpha: 0}, where)
      .to(this.phones.el, 1, {css: {
        scaleX: 10.01,
        scaleY: 10.01,
        autoAlpha: 0,
        top: 0,
        left: 0,
        x: (this.phones.centerW),
        z:0.01,
        force3D:true
      }}, where)
    return this.tl;
  },
  iconsIn:function(where){
    this.tl
      .set(this.icons.el, {top: this.icons.centerH})
      .to(this.icons.el, 1, {
        autoAlpha: 1, 
        width: '100%', 
        height: 'auto'
      }, where);
    return this.tl;
  },
  centerIconsH:function(){
    this.icons.centerH = (this.container.height()/2)-(this.icons.el.height()/2);
    return this.icons.centerH;
  },
  resetIcons:function(){
    TweenMax.set(this.icons.el, {top: (this.container.height()/2 - (this.icons.el.height() /2))})
    TweenMax.set(this.icons.el, {
      autoAlpha: 0, width: 0, height: 0,
    })
  },
  setBrowserWin:function(){
    var padding = 20;
    var $this=this;
    this.browserWin.originalW = this.browserWin.el.width();
    this.browserWin.originalH = this.browserWin.el.height();
    this.browserWin.marginT = this.browserWin.el.css('margin-top').replace('px','');
  },
  resetBrowserWin:function(){
    TweenMax.set(this.browserWin.el, {
      css:{
        marginTop: (this.browserWin.marginT*2),
        width: 0,
        height: 0,
      }
    });
  },
  getSplitPhones:function(){
    // More margin = more spacing between phones
    var pos = ['left','center','right'];
    var obj = [];
    var margin = 80;
    this.phones.el.each(function(i){
      var w = $(this).width();
      var newLeft;
      // Set new left base on position
      switch(pos[i]){
        case 'left':
            newLeft = Number($(this).css('left').replace('px','')) - (w + margin);
          break;
        case 'right':
            newLeft = Number($(this).css('left').replace('px','')) + (w + margin);
          break;
        case 'center':
            newLeft = $(this).css('left');
          break;
      }
      obj.push({name: pos[i], transitionTo: newLeft, el: $(this)});

    })

    return obj;
  },
  zoomVRGoggles:function(where){

    var extraTopSpacing = 80;

    this.tl
      .to(this.VRGoggles.el, 1, {css: {
        width: this.VRGoggles.originalW, 
        height: this.VRGoggles.originalH, 
        left: 0,
        marginTop: this.VRGoggles.marginT+extraTopSpacing,
        marginLeft: 0,
        autoAlpha: 1
      }}, where)
      .to(this.icons.el, 1, {
        css: {
          width: 0,
          height: 0,
          autoAlpha: 0,
          marginTop: 300,
          marginLeft: 140,
          force3D:true
        }
      }, where+"+=0.2")

    return this.tl
  },
  setVRGoggles:function(){
    this.VRGoggles.originalH = this.VRGoggles.el.height();
    this.VRGoggles.originalW = this.VRGoggles.el.width();
    this.VRGoggles.marginT = Number(this.VRGoggles.el.css('margin-top').replace('px',''));
    TweenMax.set(this.VRGoggles.el, {css:{
      width: (this.VRGoggles.originalW*6), 
      height: (this.VRGoggles.originalH*6), 
      left: '-100%',
      marginTop: ((this.container.height()/2)-(this.VRGoggles.originalH*2)),
      marginLeft: ((this.container.width()/2)-(this.VRGoggles.originalW)),
      autoAlpha: 0,
      z:0.01
    }})
  },
  finalTransition:function(where){

    var phones = $('._2_col_phones');
    var iconsFullPreview = $('.icons_full_preview');
    var laughingCowWebsite=$('.laughing_cow_website');
    var burtsBess = $('.burtsBees');
    var watch = $('.appleWatch');

    this.tl
    .to(this.VRGoggles.el, 1, {
      width: this.VRGoggles.originalW*0.5,
      height: this.VRGoggles.originalH*0.5,
      left: (this.container.width()/2)-((this.VRGoggles.originalW*0.5)/2)
    }, where)
    .to(phones, 1, {
      css: {
        marginTop: this.container.height()-(phones.height()/2),
        marginLeft: ((this.container.width()/2)-(phones.width()/2)/0.308)
      }
    },where)
    .to(iconsFullPreview, 1, {
      marginTop: (this.container.height()/2)-(iconsFullPreview.height())
    },where)
    .to(laughingCowWebsite, 1, {
      marginTop: (this.container.height()/2)+((laughingCowWebsite.height())*1.35),
      // marginLeft: 0,
    },where)
    .to(burtsBess, 1, {css:{
      marginTop: (this.container.height()/2)/2.5,
      marginLeft: (this.container.width()/2)-((burtsBess.width()*0.9)/2)/1.25,
    }}, where)
    .to(watch, 1, {css:{
      marginTop: (this.container.height()/2)-((watch.height()*0.17))*6,
      marginLeft: 0-((watch.width()*0.17))
    }},where)

    return this.tl;
  },
  setFinalTransition:function(tl,where){
    var padding = 20;
    var phones = $('._2_col_phones');
    var iconsFullPreview = $('.icons_full_preview');
    var laughingCowWebsite=$('.laughing_cow_website')
    var burtsBess = $('.burtsBees');
    var watch = $('.appleWatch');


    TweenMax.set(phones, {css:{
      width: phones.width()*0.6,
      height: phones.height()*0.6
    }})

    TweenMax.set(phones, {css:{
      marginTop: this.container.height()+(phones.height()*2),
      marginLeft: ((this.container.width()/2)-(phones.width()/2)/0.308)
    }})

    TweenMax.set(iconsFullPreview, {
      marginTop: 0-(phones.height()*2),
      marginLeft: (this.container.width()/2)-((iconsFullPreview.width()*0.6)/2),
      width: iconsFullPreview.width()*0.6,
      height: iconsFullPreview.height()*0.6,
    });

    TweenMax.set(laughingCowWebsite, {
      css:{
        width: laughingCowWebsite.width()*0.8,
        height: laughingCowWebsite.height()*0.8,
      }
    });

    TweenMax.set(laughingCowWebsite, {
      css: {
        marginTop: (this.container.height()*2)+laughingCowWebsite.height(),
        marginLeft: this.container.width()-((laughingCowWebsite.width()*0.8)*0.9),
      }
    })


    TweenMax.set(burtsBess, {css:{
      marginTop: 0-(burtsBess.height()*2),
      width: burtsBess.width()*0.9,
      height: burtsBess.height()*0.9,
    }})
    TweenMax.set(burtsBess, {css:{
      marginLeft: (this.container.width()/2)-((burtsBess.width()*0.9)/2)/1.25
    }});


    TweenMax.set(watch, {css:{
      width: watch.width()*0.17,
      height: watch.height()*0.17,
      rotation: '90deg'
    }});
    TweenMax.set(watch, {css:{
      marginLeft: 0-((watch.width()*0.17)),
      // marginTop: 0-((watch.height())*2)
      marginTop: -this.container.height()*2
    }});


  },
  snapToScroll:function(e){

    var directions = ["FORWARD", "REVERSE"];
    var info = CULTURE_PAGE.controller.info();
    var scrollDirection = info.scrollDirection;

    if(!CULTURE_PAGE.scrolling.isScrolling){
      // FORWARD
      if(scrollDirection === directions[0]){

          // When current animation is at the end
          if(CULTURE_PAGE.scrolling.currentAnim >= CULTURE_PAGE.scrolling.maxAnim){
            CULTURE_PAGE.scrolling.isScrolling = false;
            $.scrollLock( false ); 
          }
          else{
            $.scrollLock( true );
            CULTURE_PAGE.scrolling.isScrolling = true;
            CULTURE_PAGE.scrolling.currentAnim++;
            CULTURE_PAGE.controller.scrollTo(CULTURE_PAGE.scrolling.scrollPositions[CULTURE_PAGE.scrolling.currentAnim]);
          }

      }
      // BACKWARD
      else if (scrollDirection === directions[1]){

        // When current animation is at the beginning
        if(CULTURE_PAGE.scrolling.currentAnim === 0){
          CULTURE_PAGE.scrolling.isScrolling = false;
          $.scrollLock( false );
        }
        else{
          CULTURE_PAGE.scrolling.isScrolling = true;
          $.scrollLock( true );
          CULTURE_PAGE.scrolling.currentAnim--;
          CULTURE_PAGE.controller.scrollTo(CULTURE_PAGE.scrolling.scrollPositions[CULTURE_PAGE.scrolling.currentAnim])
        }

      }
    }

  }
}

// wait until DOM is ready
document.addEventListener("DOMContentLoaded", function(event) {

    // wait until window is loaded - meaning all images, style-sheets, and assets
    window.onload = function() {
      CULTURE_PAGE.resize();
      setTimeout(function(){
        CULTURE_PAGE.init();
      }, 500)
    };
});


$(window).resize(function(){
  // CULTURE_PAGE.resize();
})