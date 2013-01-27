require "compass"
require "susy"
require "breakpoint"
require "respond-to"
require "animation"

require "jekyll-assets"
require "jekyll-assets/compass"

require "sprockets/sass"

Sprockets::Sass.options[:line_comments] = true
Sprockets::Sass.options[:debug_info] = true
Sprockets::Sass.options[:style] = :expanded
Sprockets::Sass.options[:disable_warnings] = false

