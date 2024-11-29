import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchcards } from '../store/cardsSlice'
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Autocomplete,
    CircularProgress,
    CardMedia,
  } from '@mui/material';

const CardList = () => {
    const dispatch = useDispatch()
    const { cards, loadings, error } = useSelector((state) => state.cards)


    const [seaarchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        dispatch(fetchcards());
    }, [dispatch])

    const filterCards = cards.filter((card) =>
        card.title.toLowerCase().includes(seaarchTerm.toLowerCase())
    );

    return (
        <Box sx={{
            padding: { xs: 2, sm: 4 },
            maxWidth: '1200px',
            margin: 'auto',
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
            boxShadow: 3,
          }}>
            <Box
        sx={{
          textAlign: 'center',
          padding: { xs: 2, sm: 4 },
          mb: 4,
          backgroundImage:
            'linear-gradient(135deg, #4caf50 30%, #81c784 90%)',
          borderRadius: 2,
          color: '#fff',
          boxShadow: 4,
        }}
      >

<Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            fontSize: { xs: '1.8rem', sm: '2.5rem' },
          }}
        >
          Explore Amazing Cards
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Search and filter through a collection of beautiful cards.
        </Typography>
      {/* Search Input with Autocomplete */}
      <Autocomplete
        freeSolo
        options={cards.map((card) => card.title)} 
        onInputChange={(event, value) => {
          setSearchTerm(value); 
        }}
        onChange={(event, value) => {
          setSearchTerm(value || ''); 
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by title"
            variant="outlined"
            fullWidth
            sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
                boxShadow: 2,
              }}
          />
        )}
      />
      </Box>


      {/* Display Cards */}
      {loadings ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ textAlign: 'center' }}>
          {error}
        </Typography>
      ) : filterCards.length === 0 ? (
        <Typography sx={{ textAlign: 'center'}}>
          No results found for "{seaarchTerm}"
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filterCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
              <Card
               sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 4,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 8,
                },
              }}
              >
                 <CardMedia
                  component="img"
                  alt={card.title}
                  height="100"
                  image={
                    card.image ||
                    'https://via.placeholder.com/300x140?text=No+Image' 
                  }
                  sx={{
                    borderRadius: '8px 8px 0 0',
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      textAlign: 'center',
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      textAlign: 'center',
                      lineHeight: 1.2,
                    }}
                  >
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
    )
}

export default CardList
