import * as THREE from 'three';
/**
 * @author mrdoob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Plane.as
 */

const { Geometry } = THREE;

function NinePlaneGeometry( width, height ) {
  const widthSegments = 3;
  const heightSegments = 3;

  Geometry.call( this );

  this.type = 'NinePlaneGeometry';

  this.parameters = {
    width: width,
    height: height,
    widthSegments: widthSegments,
    heightSegments: heightSegments
  };

  this.fromBufferGeometry( new NinePlaneBufferGeometry( width, height, widthSegments, heightSegments ) );
  this.mergeVertices();

}

NinePlaneGeometry.prototype = Object.create( Geometry.prototype );
NinePlaneGeometry.prototype.constructor = NinePlaneGeometry;

/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 *
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Plane.as
 */

const { Float32BufferAttribute } = THREE;
const { BufferGeometry } = THREE;

function NinePlaneBufferGeometry( width, height, widthSegments, heightSegments ) {

  BufferGeometry.call( this );

  this.type = 'NinePlaneBufferGeometry';

  this.parameters = {
    width: width,
    height: height,
    widthSegments: widthSegments,
    heightSegments: heightSegments
  };

  var width_half = width / 2;
  var height_half = height / 2;

  var gridX = Math.floor( widthSegments ) || 1;
  var gridY = Math.floor( heightSegments ) || 1;

  var gridX1 = gridX + 1;
  var gridY1 = gridY + 1;

  var segment_width = width / gridX;
  var segment_height = height / gridY;

  var ix, iy;

  // buffers

  var indices = [];
  var vertices = [];
  var normals = [];
  var uvs = [];

  // generate vertices, normals and uvs

  for ( iy = 0; iy < gridY1; iy ++ ) {

    var y = iy * segment_height - height_half;

    for ( ix = 0; ix < gridX1; ix ++ ) {

      var x = ix * segment_width - width_half;

      vertices.push( x, - y, 0 );

      normals.push( 0, 0, 1 );

      uvs.push( ix / gridX );
      uvs.push( 1 - ( iy / gridY ) );

    }

  }

  // indices

  for ( iy = 0; iy < gridY; iy ++ ) {

    for ( ix = 0; ix < gridX; ix ++ ) {

      var a = ix + gridX1 * iy;
      var b = ix + gridX1 * ( iy + 1 );
      var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
      var d = ( ix + 1 ) + gridX1 * iy;

      // faces

      indices.push( a, b, d );
      indices.push( b, c, d );

    }

  }

  // build geometry

  this.setIndex( indices );
  this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
  this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
  this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

}

NinePlaneBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
NinePlaneBufferGeometry.prototype.constructor = NinePlaneBufferGeometry;

export { NinePlaneGeometry, NinePlaneBufferGeometry };
