# patch to run svg files running webrick
# @see: https://github.com/mojombo/jekyll/issues/406#issuecomment-10570065
require 'webrick'
include WEBrick
WEBrick::HTTPUtils::DefaultMimeTypes.store 'svg', 'image/svg+xml'