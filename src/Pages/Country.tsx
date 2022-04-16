import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Container, TextField } from '@mui/material'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Country: FC = () =>
{
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');
    const [disable, setDisable] = useState<boolean>(true);

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <Box sx={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                maxWidth: '400px',
                textAlign: 'center',
                padding: {
                    xs: '20px',
                    sm: '30px',
                    md: '40px',
                    lg: '50px'
                }
            }}>
                <TextField
                    type="text"
                    variant="outlined"
                    label="Country Name"
                    fullWidth
                    InputLabelProps={{
                        shrink: true
                    }}
                    margin="normal"
                    onChange={e =>
                    {
                        setSearch(e.target.value);
                        setDisable(false);
                    }}
                >
                </TextField>
                <Button
                    variant="outlined"
                    size="large"
                    disabled={disable}
                    color="success"
                    endIcon={<SearchIcon />}
                    onClick={() => navigate(`/information/${search}`)}
                >
                    Search
                </Button>
            </Box>
        </Container>
    )
}

export default Country
