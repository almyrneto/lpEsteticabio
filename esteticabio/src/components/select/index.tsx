import { useState } from "react"
import { colors } from "../../theme"
import Select, { components } from 'react-select'
import { styled } from "styled-components";
import React from "react";
import { CheckboxContainer, CheckboxStyle } from "./styled";

const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        width: '400px',
        height: '67px',
        borderRadius: '16px 16px 0 0',
        border: `1px solid ${state.isFocused ? colors.verdePrincipal : colors.cinza1}`,
        boxShadow: `${colors.boxshadow}`,
        paddingLeft: '1rem',
        fontSize: '16px',
        fontWeight: 500,
        color: `${colors.cinza4}`,
        '&:hover': {
            borderColor: `${colors.verdePrincipal} !important`,
            boxShadow: `${colors.boxshadow} !important`,
        },
        '&:focus': {
            borderColor: `${colors.verdePrincipal} !important`,
            boxShadow: `${colors.boxshadow} !important`,
            outline: 'none',
        },
    }),
    placeholder: (provided: any) => ({
        ...provided,
        fontSize: '14px',
        fontWeight: 400,
        color: `${colors.cinza}`,
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (provided: any) => ({
        ...provided,
        color: `${colors.cinza4}`,
    }),
    menu: (provided: any) => ({
        ...provided,
        height: '130px',
        borderTop: 'none',
        marginTop: '0',
        borderRadius: '0 0 16px 16px',
        border: `1px solid ${colors.verdePrincipal}`,
        boxShadow: `${colors.boxshadow}`,
        background: `${colors.branco} !important`,
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        background: state.isSelected ? 'transparent' : state.isFocused ? 'transparent' : 'transparent',
        '&:hover': {
            background: state.isSelected ? 'transparent' : `${colors.verdePrincipal}`,
        },
        color: state.isSelected ? `${colors.cinza4}` : `${colors.cinza4}`,
    }),
    // applyButton: {
    //     cursor: 'pointer',
    //     color: `${colors.verdePrincipal}`,
    //     fontWeight: '600',
    //     fontSize: '14px',
    //     textAlign: 'right',
    //     background: 'none',
    //     border: 'none',
    // }

};

const StyledSelect = styled.div <StyledSelectProps>`
    .css-yk16xz-control:hover {
        border-color: ${({ isFocused }: { isFocused?: boolean }) =>
        isFocused ? colors.verdePrincipal : colors.cinza1} !important;
        box-shadow: ${({ isFocused }: { isFocused?: boolean }) =>
        isFocused ? colors.boxshadow : 'none'} !important;
    }

    .css-yk16xz-control:focus {
        border-color: ${colors.verdePrincipal} !important;
        box-shadow: ${colors.boxshadow} !important;
        outline: none;
    }
`

interface StyledSelectProps {
    isFocused: boolean
}

type InputSelectProps = {
    placeholder: string
}

interface OptionType {
    value: string;
    label: string;
}

// type ApplyButtonProps = {
//     innerProps: any,
//     label: string,
//     onSelect: () => void,
// }

// const ApplyButton = ({ innerProps, label, onSelect }: ApplyButtonProps) => {
//     return (
//         <div {...innerProps} style={customStyles.applyButton} onClick={onSelect}>
//             {label}
//         </div>
//     )
// }

// const CustomMenu = (props: any) => {
//     const { innerProps, children, selectProps } = props;

//     return (
//         <div
//             {...innerProps}
//         >
//             {children}
//             <ApplyButton
//                 innerProps={innerProps}
//                 label="Aplicar"
//                 onSelect={() => {
//                     selectProps.onMenuClose()
//                 }}
//             />
//         </div>
//     )
// }


const OptionCheckbox: React.FC<any> = ({ children, ...props }) => {
    return (
        <components.Option {...props}>
            <CheckboxContainer>
                <CheckboxStyle type="checkbox" checked={props.isSelected} onChange={() => null} />
                {children}
            </CheckboxContainer>
        </components.Option>
    )
}

const options: OptionType[] = [
    { value: 'esteticista', label: 'Esteticista' },
    { value: 'salaodebeleza', label: 'Salão de beleza' },
    { value: 'medico', label: 'Médico' },
];

export const InputSelect = ({ placeholder }: InputSelectProps) => {
    const [selectedOptions, setSelectedOptions] = useState<OptionType | null>(null);
    const [isFocused, setIsFocused] = React.useState(false);

    const handleChange = (selected: OptionType | null) => {
        setSelectedOptions(selected);
    }

    return (
        <StyledSelect isFocused={isFocused}>
            <Select
                options={options}
                placeholder={placeholder}
                value={selectedOptions}
                onChange={handleChange}
                styles={customStyles}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                components={{ Option: OptionCheckbox }}
            />
        </StyledSelect>

    )
}