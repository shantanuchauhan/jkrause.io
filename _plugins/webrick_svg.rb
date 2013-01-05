# Simple patch to handle svg files by webrick by Seth Ladd (https://github.com/sethladd)
# @see: https://github.com/mojombo/jekyll/issues/406#issuecomment-10570065
require 'webrick'
include WEBrick
WEBrick::HTTPUtils::DefaultMimeTypes.store 'svg', 'image/svg+xml'