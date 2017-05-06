require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
var imgData=require('../data/img.json');
var clientWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,
  clientHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
var imgW=300,imgH=380;
class SingleImg extends React.Component{
  constructor(...args) {
    super(...args);
    this.state={
    }
  }
  static defaultProps={
    arrange:{},
    data:{},
  };
  handleClick(e){
    e.preventDefault();
    e.stopPropagation();
    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else{
      this.props.center();
    }
  }
  render(){
    var styleObj={};
    if(this.props.arrange.pos){
      styleObj=this.props.arrange.pos;
    }
    if(this.props.arrange.rotate){
        styleObj.transform='rotate('+this.props.arrange.rotate+'deg)';
    }
    if(this.props.arrange.isCenter){
      styleObj.zIndex=100;
    }
    var singlePhotoClass="singlePhoto"+(this.props.arrange.isInverse?" inverse":"");
    return(<div className={singlePhotoClass} style={{left:styleObj.left+"px",
        top:styleObj.top+"px",
        msTransform:styleObj.transform,
        WebkitTransform:styleObj.transform,
        MozTransform:styleObj.transform,
        zIndex:styleObj.zIndex
      }} onClick={this.handleClick.bind(this)}>
        <img src={this.props.data.url} alt={this.props.data.title} title={this.props.data.title}/>
        <h2>{this.props.data.title}</h2>
        <div className="backside" onClick={this.handleClick.bind(this)}>{this.props.data.desc}</div>
    </div>
    );
  }
}
class Controller extends  React.Component{
  constructor(...args) {
    super(...args);
    this.state={
    }
  }
  static defaultProps={
    arrange:{},
  };
  handleClick(e){
    e.preventDefault();
    e.stopPropagation();
    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else{
      this.props.center();
    }
  }
  render(){
    var controllerUnitClass="controller-unit";
    if(this.props.arrange.isCenter){
      controllerUnitClass+=" is-center";
      if(this.props.arrange.isInverse){
        controllerUnitClass+=" is-inverse";
      }
    }
    return<span className={controllerUnitClass} onClick={this.handleClick.bind(this)}></span>
  }
}
class AppComponent extends React.Component {

  constructor(...args) {
    super(...args);
    this.state={
      imgArrangeArr:[
        {
          pos:{
            left:0,
            top:0
          },
          rotate:0,
          isInverse:false,
          isCenter:false
        }
      ]
    };
}
  posRange={
    centerPos: {
      x: 0,
      y: 0
    },
    xPos:{
      y:[0,0],
      leftX:[0,0],
      rightX:[0,0]
    },
    yPos:{
      x:[0,0],
      topY:[0,0],
    }
  };
    getRangeRandom(low,high){
      return Math.ceil(Math.random()*(high-low)+low);
    }
    getRotateRandom(){
      return ((Math.random()>0.5?"":"-")+Math.ceil(Math.random()*30));
    }
    inverse(index){
      return function(){
        var imgArrangeArr=this.state.imgArrangeArr;
        imgArrangeArr[index].isInverse=!imgArrangeArr[index].isInverse;
        this.setState({imgArrangeArr:imgArrangeArr});
      }.bind(this);
    }
    center(index){
      return function(){
        this.rerange(index);
      }.bind(this)
    }
    rerange(centerIndex){//居中哪个图片
      var _this=this;
      var imgArrangeArr=this.state.imgArrangeArr,
        posRange=this.posRange,
        centerPos=posRange.centerPos,

        xPos=posRange.xPos,
        yPos=posRange.yPos,

        xPosLeftX=xPos.leftX,
        xPosRightX=xPos.rightX,
        xPosY=xPos.y,

        yPosTopY=yPos.topY,
        yPosX=yPos.x;

        var imgTopArrangeArr=[],
          topImgNum=Math.floor(Math.random()*2),
          topImgIndex,
          //居中
          centerImgArr=imgArrangeArr.splice(centerIndex,1);
          centerImgArr[0].pos={top:centerPos.y,left:centerPos.x};
          centerImgArr[0].rotate=0;
          centerImgArr[0].isCenter=true;
          //上
          topImgIndex=Math.ceil(Math.random()*imgArrangeArr.length-topImgNum);
          imgTopArrangeArr=imgArrangeArr.splice(topImgIndex,topImgNum);
          imgTopArrangeArr.forEach(function (value,index) {
            imgTopArrangeArr[index].pos={left:_this.getRangeRandom(yPosX[0],yPosX[1]),
              top:_this.getRangeRandom(yPosTopY[0],yPosTopY[1])};
            imgTopArrangeArr[index].rotate=_this.getRangeRandom();
            imgTopArrangeArr[index].isCenter=false;
          });
          //左右
          for(var i=0,j=imgArrangeArr.length,k=j/2;i<j;i++){
            var leftOrRightX=null;
            if(i<k){
              leftOrRightX=xPosLeftX;
            }else{
              leftOrRightX=xPosRightX;
            }
            imgArrangeArr[i].pos={
              top:this.getRangeRandom(xPosY[0],xPosY[1]),
              left:this.getRangeRandom(leftOrRightX[0],leftOrRightX[1])
            };
            imgArrangeArr[i].rotate=this.getRotateRandom();
            imgArrangeArr[i].isCenter=false;
          }

          if(imgTopArrangeArr.length==1){
            imgArrangeArr.splice(topImgIndex,0,imgTopArrangeArr[0]);
          }
          imgArrangeArr.splice(centerIndex,0,centerImgArr[0]);
      this.setState({imgArrangeArr:imgArrangeArr});

    }

    componentDidMount(){
      var imgArrangeArr=this.state.imgArrangeArr;
        for(var i=0;i<11;i++){///////////
        imgArrangeArr[i]={pos:{}};
        imgArrangeArr[i].pos={
          left:0,
          top:0
        };
        imgArrangeArr[i].rotate=0;
        imgArrangeArr[i].isInverse=false;
        imgArrangeArr[i].isCenter=false;
      }
      this.setState({imgArrangeArr:imgArrangeArr});
    var stageH=clientHeight,
       stageW=clientWidth,
       halfStageW=Math.ceil(stageW/2),
       halfStageH=Math.ceil(stageH/2);

      var  halfImgW=Math.ceil(imgW/2),
        halfImgH=Math.ceil(imgH/2);
      this.posRange.centerPos={
        x:halfStageW-halfImgW,
        y:halfStageH-halfImgH
      };
      this.posRange.xPos.leftX[0]=-halfImgW;
      this.posRange.xPos.leftX[1]=halfStageW-halfImgW*3;
      this.posRange.xPos.rightX[0]=halfStageW+halfImgW;
      this.posRange.xPos.rightX[1]=stageW-halfImgW;
      this.posRange.xPos.y[0]=-halfImgH;
      this.posRange.xPos.y[1]=stageH-halfImgH;

      this.posRange.yPos.topY[0]=-halfImgH;
      this.posRange.yPos.topY[1]=halfStageH-halfImgH*3;
      this.posRange.yPos.x[0]=halfStageW-imgW;
      this.posRange.yPos.x[1]=halfStageW;
      this.rerange(0);
    }
  render() {
    var _this=this;
    var imgFigures=[],controllerUnits=[];
    var imgArrangeArr=this.state.imgArrangeArr;
    imgData.forEach(function (value,index) {
     // console.log(imgArrangeArr[index].pos);
    /* 前后渲染问题？
    if(imgArrangeArr[index].pos.left==null ||imgArrangeArr[index].pos.top==null){
       imgArrangeArr[index].pos={
          left:0,
          top:0
        }
      }*/
      imgFigures.push(<SingleImg
        key={index}
        data={value}
        arrange={imgArrangeArr[index]}
       inverse={_this.inverse(index)}
        center={_this.center(index)}
      />);
      controllerUnits.push(<Controller
        key={index}
        arrange={imgArrangeArr[index]}
        inverse={_this.inverse(index)}
        center={_this.center(index)}
      />);
    });

    return (
      <div className="stage">
        <div className="imgs">{imgFigures}</div>
        <div className="controller">{controllerUnits}</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
