import * as THREE from 'three';

function Geometries() {

  // apply texture
  // http://stackoverflow.com/questions/19182298/how-to-texture-a-three-js-mesh-created-with-shapegeometry

  this.makeRoundShape = (width, height, radius) => {

    const roundedRectShape = new THREE.Shape();

    ( function roundedRect( ctx, x, y, width, height, radius){
      const left = -1;
      const top = 1;
      const bottom = -1;
      const right = 1;

      radius = radius / width;
      const aspect = width/height;
      const radiusY = radius * aspect;

      // const left =-width / 2;
      // const top = height / 2;
      // const right = width / 2;
      // const bottom = - height / 2;


      ctx.moveTo(left, top);
      ctx.lineTo(left, bottom);
      // ctx.quadraticCurveTo(left, bottom, left + radius, bottom);
      ctx.lineTo(right - radius, bottom);
      ctx.quadraticCurveTo(right, bottom, right, bottom + radiusY);
      ctx.lineTo(right, top - radiusY);
      ctx.quadraticCurveTo(right, top, right - radius, top);
      ctx.lineTo(left, top);

      // ctx.moveTo( x, y + radius );
      // ctx.lineTo( x, y + height - radius );
      // ctx.quadraticCurveTo( x, y + height, x + radius, y + height );
      // ctx.lineTo( x + width - radius, y + height) ;
      // ctx.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
      // ctx.lineTo( x + width, y + radius );
      // ctx.quadraticCurveTo( x + width, y, x + width - radius, y );
      // ctx.lineTo( x + radius, y );
      // ctx.quadraticCurveTo( x, y, x, y + radius );

    } )(roundedRectShape, 0, 0, width, height, radius);


    const geometry = new THREE.ShapeBufferGeometry(roundedRectShape);
    
    geometry.scale(width / 2, height/ 2, 1);
    
    return geometry;
  };

  this.makeSquareShape = (width, height) => {
    const shape = new THREE.Shape();

    // const left =-width / 2;
    // const top = height / 2;
    // const right = width / 2;
    // const bottom = - height / 2;

    const left = -1;
    const top = -1;
    const right = 1;
    const bottom = 1;

    shape.moveTo(left, top);
    shape.lineTo(left, bottom);
    shape.lineTo(right, bottom);
    shape.lineTo(right, top);
    shape.lineTo(left, top);
    

    const geometry = new THREE.ShapeBufferGeometry(shape);

    geometry.scale(width / 2, height/ 2, 1);
    
    return geometry;
  };

  this.makeParametricRound = () => {
    const roundF = (u, v) => {

      u *= 2;
      u -= 1;

      v *= 2;
      v -= 1;

      var r = 50;
      var x = Math.sin(u) * r;
      var z = Math.sin(v / 2) * 2 * r;
      var y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;
      
      return new THREE.Vector3(u, v, 1);

    };

    const geometry = new THREE.ParametricGeometry(roundF, 20, 20, false);

    return geometry;
  };

  this.makeRoundedCornerPlane = (offset, radius, smooth) => {
    const geometry = new THREE.Geometry();

    const cornerA = new THREE.CircleGeometry(radius,
                                             smooth,
                                             (Math.PI * 2 / 4) * 1,
                                             Math.PI * 2 / 4);

    const matrixA = new THREE.Matrix4();
    matrixA.makeTranslation(0-offset, 0+offset, 0);
    geometry.merge(cornerA, matrixA);

    const planeA = new THREE.PlaneGeometry((offset + radius) * 2,
                                           offset * 2);
    geometry.merge(planeA);

    const planeB = new THREE.PlaneGeometry(offset * 2,
                                           (offset + radius) * 2);
    geometry.merge(planeB);

    return geometry;
  };

}

export { Geometries }
