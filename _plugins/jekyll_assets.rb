require "jekyll-assets"
require "jekyll-assets/compass"

susy_dir = Gem::Specification.find_by_name("susy").gem_dir
Sprockets.append_path File.join(susy_dir, "sass")

respondto_dir = Gem::Specification.find_by_name("respond-to").gem_dir
Sprockets.append_path File.join(respondto_dir, "stylesheets")

breakpoint_dir = Gem::Specification.find_by_name("breakpoint").gem_dir
Sprockets.append_path File.join(breakpoint_dir, "stylesheets")

animation_dir = Gem::Specification.find_by_name("animation").gem_dir
Sprockets.append_path File.join(animation_dir, "stylesheets")