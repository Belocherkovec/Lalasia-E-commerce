import cn from 'classnames';
import styles from './select.module.scss';

export type SelectProps = {
  className?: string;
  options: Record<string, string>;
  value: string;
  // onChange: () => void;
};

const Select: React.FC<SelectProps> = ({ className, options, value }) => {
  return (
    <div className={cn(className, styles.select)}>
      <p>{value}</p>
      <div>
        {Object.entries(options).map(([key, value]) => (
          <button key={value + key}>{value}</button>
        ))}
      </div>
    </div>
  );
};

export default Select;
