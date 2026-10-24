import * as React from 'react';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import OutlinedInput from '@mui/material/OutlinedInput';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useEffect, useState } from 'react';


export default function NumberSpinner({
  id: idProp,
  label,
  error,
  size = 'medium',
  onChange: onChange,
  ...other
}: BaseNumberField.Root.Props & {
  label?: React.ReactNode;
  size?: 'small' | 'medium';
  error?: boolean;
  onChange?: Function
}) {
  let id = React.useId();
  if (idProp) {
    id = idProp;
  }


  const [numberValue, setNumberValue] = useState(Number(0.00));

  const onIncrementChange = (value: Number) => {
    setNumberValue(value = numberValue + 1);
    if (onChange !== undefined) {
      onChange(value)
    }
  }

  const onDecrementChange = (value: Number) => {
    setNumberValue(value = numberValue - 1);
    if (onChange !== undefined) {
      onChange(value)
    }
  }

  const onChangeValue = (value: Number) => {
    setNumberValue(Number(value));
    if (onChange !== undefined) {
      onChange(value)
    }
  }



  return (
    <BaseNumberField.Root
      {...other}
      render={(props, state) => (
        <FormControl
          size={size}
          ref={props.ref}
          disabled={state.disabled}
          required={state.required}
          error={error}
          className={`${props.className}`}
          variant="outlined"
          sx={{
            '& .MuiButton-root': {
              borderColor: 'divider',
              minWidth: 0,
              bgcolor: 'action.hover',
              '&:not(.Mui-disabled)': {
                color: 'text.primary',
              },
            },
          }}
        >
          {props.children}
        </FormControl>
      )}
    >
      <BaseNumberField.ScrubArea
        render={
          <Box component="span" sx={{ userSelect: 'none', width: 'max-content' }} className={`p-8`} />
        }
      >
        <FormLabel
          htmlFor={id}
          sx={{
            display: 'inline-block',
            cursor: 'ew-resize',
            fontSize: '0.875rem',
            color: 'text.primary',
            fontWeight: 500,
            lineHeight: 1.5,
            mb: 0.5,
          }}
        >
          {label}
        </FormLabel>
        <BaseNumberField.ScrubAreaCursor>
          <OpenInFullIcon
            fontSize="small"
            sx={{ transform: 'translateY(12.5%) rotate(45deg)' }}
          />
        </BaseNumberField.ScrubAreaCursor>
      </BaseNumberField.ScrubArea>
      <Box sx={{ display: 'flex' }}>
        <BaseNumberField.Decrement
          render={
            <Button
              variant="outlined"
              aria-label="Decrease"
              size={size}
              sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderRight: '0px',
                '&.Mui-disabled': {
                  borderRight: '0px',
                },
              }}

              onClick={(event: any) => onDecrementChange(Number(event.target.value))}
            />
          }
        >
          <RemoveIcon fontSize={size} />
        </BaseNumberField.Decrement>

        <BaseNumberField.Input
          id={id}
          render={(props, state) => (
            <OutlinedInput
              inputRef={props.ref}
              value={Number(state.inputValue)}
              onBlur={props.onBlur}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (onChangeValue !== undefined) {
                  onChangeValue(Number(String(event.target.value).replace(/,/g,'')))
                } else {

                };
              }}
              onKeyUp={props.onKeyUp}
              onKeyDown={props.onKeyDown}
              onFocus={props.onFocus}
              slotProps={{
                input: {
                  ...props,
                  onChange: (event) => {
                    props.onChange?.(event)
                  },
                  sx: {
                    textAlign: 'center',
                  },
                },
              }}
              sx={{ pr: 0, borderRadius: 0, flex: 1 }}
            />
          )}
        />

        <BaseNumberField.Increment
          render={(props, state) =>
            <Button
              className={`${other.className}`}
              variant="outlined"
              aria-label="Increase"
              size={size}
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeft: '0px',
                '&.Mui-disabled': {
                  borderLeft: '0px',
                },
              }}
              onClick={(event) => {
                onIncrementChange(Number(event.currentTarget.textContent));
                props?.onChange?.(event)
              }}
            >
              <AddIcon fontSize={size} />
            </Button>
          }
        >

        </BaseNumberField.Increment>
      </Box>
    </BaseNumberField.Root>
  );
}