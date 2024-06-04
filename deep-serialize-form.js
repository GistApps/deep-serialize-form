/**
 * Copyright (c) 2021 Gist Applications Inc.
 *
 * Form serializer capable of handling nested data and arrays. Based largely from
 * the Ben Alman's De-param function from the JQuery BBQ plugin, but altered to
 * have no jQuery dependencies, and convert FormData into javascript objects,
 * instead of query parameters
 *
 * http://benalman.com/projects/jquery-bbq-plugin/
 *
 *
 * @summary Convert form data to javascript object
 * @author Zac Fair <zac@gist-apps.com>
 * @website https://gist-apps.com
 *
 * Created at     : 2021-10-26 3:04:00
 * Last modified  : 2021-10-26 3:04:00
 */

function deepSerializeForm(form) {

  var obj = {};

  var formData = new FormData(form);

  var coerce_types = { 'true': !0, 'false': !1, 'null': null };

  for(var pair of formData.entries()) {

    var key  = pair[0];
    var val  = pair[1];
    var cur  = obj;
    var i    = 0;
    var keys = key.split('][');
    var keys_last = keys.length - 1;

    if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {

      keys[keys_last] = keys[keys_last].replace(/\]$/, '');

      keys = keys.shift().split('[').concat(keys);

      keys_last = keys.length - 1;

    } else {

      keys_last = 0;
    }

    val = val && !isNaN(val)              ? +val              // number
        : val === 'undefined'             ? undefined         // undefined
        : coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
        : val;

    if ( keys_last ) {

      for (; i <= keys_last; i++) {
        key = keys[i] === '' ? cur.length : keys[i];
        cur = cur[key] = i < keys_last
        ? cur[key] || (keys[i+1] && isNaN(keys[i+1]) ? {} : [])
        : val;
      }

    } else {

      if (Array.isArray(obj[key])) {

        obj[key].push( val );

      } else if (obj[key] !== undefined && key.slice(-2) === '[]') {

        obj[key] = [obj[key], val];

      } else {

        obj[key] = val;

      }

    }

  }

  return obj;

}

window.deepSerializeForm = deepSerializeForm;
