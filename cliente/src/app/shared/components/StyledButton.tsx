import {Button, ButtonProps, styled} from "@mui/material";

interface MyStyledButtonProps extends ButtonProps {
    to?: string; // Explicitly add the "to" prop
  }
  
  const StyledButton = styled(Button)<MyStyledButtonProps>(({ theme }) => ({
    '&.Mui-disabled': {
      backgroundColor: theme.palette.grey[500],
      color: theme.palette.text.disabled,
    },
  }));
  
  

export default StyledButton;