var KTVWeb = function (win) {
  var nCode = -1e4,
    sMsg = "KTV Undef",
    sFunction = "function";
  var _token, expire = 3e3 * 1e3;
  var search = win.location.search,
    searchMatch = search.match(/&token=(.+?)\b/);
  if (search.indexOf("debug") > -1) {
    _token = searchMatch ? searchMatch[1] : "DEBUG_TOKEN"
  }
  setInterval(function () {
    _token = "";
    KTVWeb.getToken()
  }, expire);

  function _returnUndef() {
    return {
      code: nCode,
      msg: sMsg
    }
  }

  function _noop() {
    return function () {}
  }

  function _cb(ret, cb) {
    if (typeof cb != sFunction) cb = _noop();
    cb(ret)
  }

  function _getKtv() {
    return win.HelloJsInterface || win.KTV
  }
  return {
    checkInApp: function (cb) {
      var self = this;
      self.getKTV(function (ktv) {
        var ret = true;
        if (ktv._null) {
          ret = false
        }
        _cb(ret, cb)
      })
    },
    checkApi: function (api, cb) {
      var self = this;
      self.getKTV(function (ktv) {
        var ret = false;
        if (ktv[api]) {
          ret = true
        }
        _cb(ret, cb)
      })
    },
    getVersion: function (cb) {
      var ua = win.navigator.userAgent;
      var ret = [];
      var v = 0,
        m;
      if (m = ua.match(/hello\-ios\/(\d+\.\d+\.\d+)/i)) {
        if (m) {
          v = m[1] || 0
        }
        ret = ["ios", v]
      } else if (m = ua.match(/hello\-android\/(\d+\.\d+\.\d+)/i)) {
        if (m) {
          v = m[1] || 0
        }
        ret = ["android", v]
      } else {
        ret = ["other", v]
      }
      _cb(ret, cb)
    },
    getKTV: function (cb) {
      var ktv = _getKtv();
      if (ktv) {
        _cb(ktv, cb)
      } else {
        var timeout = 5e3,
          step = 20;
        var timer = setInterval(function () {
          ktv = _getKtv();
          timeout -= step;
          if (timeout < 0) {
            clearInterval(timer);
            _cb({
              _null: true
            }, cb)
          }
          if (ktv) {
            clearInterval(timer);
            _cb(ktv, cb)
          }
        }, step)
      }
    },
    getToken: function (cb) {
      var self = this;
      if (_token) {
        _cb({
          code: 0,
          msg: "success",
          token: _token
        }, cb)
      } else {
        self.getKTV(function (ktv) {
          if (ktv.getToken) {
            win.getTokenCallback = function (code, msg, token) {
              _token = token;
              _cb({
                code: code,
                msg: msg,
                token: token
              }, cb);
              delete win.getTokenCallback
            };
            ktv.getToken()
          } else {
            _cb(_returnUndef(), cb)
          }
        })
      }
    },
    share: function (opt, cb) {
      var self = this;
      self.getKTV(function (ktv) {
        if (ktv.share) {
          win.shareCallback = function (code, msg) {
            _cb({
              code: code,
              msg: msg
            }, cb);
            delete win.shareCallback
          };
          opt = JSON.stringify(opt);
          ktv.share(opt)
        } else {
          _cb(_returnUndef(), cb)
        }
      })
    },
    setLeftButtonStyle: function (style, cb) {
      var self = this;
      self.getKTV(function (ktv) {
        if (ktv.setLeftButtonStyle) {
          win.setLeftButtonStyleCallback = function (code, msg) {
            _cb({
              code: code,
              msg: msg
            }, cb);
            delete win.setLeftButtonStyleCallback
          };
          ktv.setLeftButtonStyle(style)
        }
      })
    },
    closeWebPage: function () {
      var self = this;
      self.getKTV(function (ktv) {
        if (ktv.closeWebPage) {
          ktv.closeWebPage()
        }
      })
    },
    isSharePlatformInstalled: function (channel, cb) {
      var self = this;
      self.getKTV(function (ktv) {
        if (ktv.isSharePlatformInstalled) {
          win.isSharePlatformInstalledCallback = function (installed) {
            _cb(installed, cb);
            delete win.isSharePlatformInstalledCallback
          };
          ktv.isSharePlatformInstalled(channel)
        }
      })
    },
    enterRoomWithRoomId: function (roomId, cb) {
      var self = this;
      self.getKTV(function (ktv) {
        if (ktv.enterRoomWithRoomId) {
          win.enterRoomWithRoomIdCallback = function (code, msg) {
            _cb({
              code: code,
              msg: msg
            }, cb);
            delete win.enterRoomWithRoomIdCallback
          };
          ktv.enterRoomWithRoomId(roomId)
        }
      })
    },
    uploadInviteCode: function (helloid, cb) {
      helloid = "" + helloid;
      var self = this;
      var api = "uploadInviteCode";
      self.getKTV(function (ktv) {
        if (ktv[api]) {
          win[api + "Callback"] = function (code, msg) {
            _cb({
              code: code,
              msg: msg
            }, cb);
            delete win[api + "Callback"]
          };
          ktv[api](helloid)
        } else {
          alert("Interface not exists")
        }
      })
    },
    uploadImage: function (cb) {
      var self = this;
      var api = "uploadImage";
      self.getKTV(function (ktv) {
        if (ktv[api]) {
          win[api + "Callback"] = function (code, msg, url) {
            _cb({
              code: code,
              msg: msg,
              url: url
            }, cb);
            delete win[api + "Callback"]
          };
          ktv[api]()
        } else {
          alert("Interface not exists")
        }
      })
    },
    getPhoneType: function (cb) {
      var self = this;
      var api = "getPhoneType";
      self.getKTV(function (ktv) {
        if (ktv[api]) {
          _cb({
            code: ktv[api]()
          }, cb)
        } else {
          _cb({
            code: null
          }, cb)
        }
      })
    }
  }
}(window);
