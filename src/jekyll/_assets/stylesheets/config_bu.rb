## Compass configuration
## see: http://compass-style.org/help/tutorials/configuration-reference/
#
#require 'susy'
#require 'animation'
#require 'respond-to'
#
#http_path = '/'
#
#sass_dir = './'
#css_dir = './'
#http_stylesheets_path = http_path + 'assets/stylesheets'
#
#images_dir = '../../assets/images/'
#http_images_path = http_path + 'assets/images'
#
#fonts_dir = '../../assets/fonts/'
#http_fonts_dir = http_path + 'assets/fonts/'
#
#relative_assets = false
#preferred_syntax = :sass
#
#environment = :production
environment = :development

if environment == :development
  line_comments = true
  sass_options = { :debug_info => true }
elsif environment == :production
  disable_warnings = true
end