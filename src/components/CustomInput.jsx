import { Input } from "antd"
import { Controller } from "react-hook-form"
const CustomInput = ({
  icon,
  label,
  type,
  placeholder,
  control,
  errors,
  ...rest
}) => {
  return (
    <div className="input-container">
      <></>

      <h4 className="label">{label}</h4>
      <Controller
        name={rest.name}
        control={control}
        rules={rest.rules}
        render={({ field, fieldState }) => (
          <>
            <div className="input_wrapp">
              <div className="input_container">
                {icon && <div className="input_icon">{icon}</div>}
                {type === "password" ? (
                  <Input.Password
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    className={
                      fieldState.invalid ? "custom-input error" : "custom-input"
                    }
                  />
                ) : (
                  <Input
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    className={
                      fieldState.invalid ? "custom-input error" : "custom-input"
                    }
                  />
                )}
              </div>
            </div>
            {errors[rest.name] && (
              <p className="error-message">{errors[rest.name]}</p>
            )}
          </>
        )}
      />
    </div>
  )
}

export default CustomInput
