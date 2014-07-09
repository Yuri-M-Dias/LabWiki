module ApplicationHelper

  def show_field_error(model, field)
    s=""

    if !model.errors[field].empty?
      s =
          <<-EOHTML
            <div_id="error_message">
              #{model.errors[field][0]}
            </div>
          EOHTML
    end

    s.html_safe
  end

  def flash_class(level)
    case level
        when :notice then "alert alert-info"
        when :success then "alert alert-success"
        when :error then "alert alert-error"
        when :alert then "alert alert-error"
    end
  end

end
