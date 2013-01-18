require "compass"
require "susy"
require "breakpoint"
require "respond-to"
require "animation"

require "jekyll-assets"
require "jekyll-assets/compass"


#Compass.add_project_configuration(File.join(Dir.pwd, "config.rb"))
Compass.add_project_configuration("config.rb")

puts "Compass.configuration.line_comments: #{Compass.configuration.line_comments}"
puts "Compass.configuration.output_style: #{Compass.configuration.output_style}"
puts "Compass.configuration.environment: #{Compass.configuration.environment}"
puts "Compass.configuration.disable_warnings: #{Compass.configuration.disable_warnings}"

