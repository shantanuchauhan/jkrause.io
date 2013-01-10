# Filter to use the <!--more--> comment approach from WordPress
# @see: http://stackoverflow.com/questions/10859175/how-to-show-a-preview-of-a-post-using-jekyll-bootstrap-theme
module More
  def more(input, type)
    if input.include? "<!--more-->"
      if type == "excerpt"
        input.split("<!--more-->").first
      elsif type == "remaining"
        input.split("<!--more-->").last
      else
        input
      end
    else
      input
    end
  end
end

Liquid::Template.register_filter(More)