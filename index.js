var ndjson = require('ndjson')
var through = require('through2')
var geohash = require('ngeohash')

process.stdin
  .pipe(ndjson.parse())
  .pipe(through.obj(
    function(obj, enc, next) {
      var id = obj.key
      obj.key = geohash.encode(obj.ra, obj.dec, 10) + 'ÿ' + id
      this.push(obj)
      next()
    })
  )
  .pipe(ndjson.serialize())
  .pipe(process.stdout)