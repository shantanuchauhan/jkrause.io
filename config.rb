
http_path = '/'

sass_dir = '../_assets/stylesheets'
css_dir = '../assets/stylesheets'
http_stylesheets_path = http_path + 'assets/stylesheets'

relative_assets = false
preferred_syntax = :sass

environment = :development

if environment == :development
  line_comments = true
  sass_options = { :debug_info => true }
  output_style = :expanded
  disable_warnings = false
elsif environment == :production
  disable_warnings = true
end