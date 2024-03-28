const Button = ({text,className,OnClick}) => {
    return (
      <div>
        <button className={className} onClick={OnClick}>{text}</button>
      </div>
    )
  }
  
  export default Button