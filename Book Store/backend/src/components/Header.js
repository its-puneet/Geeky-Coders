import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Tab, Tabs } from "@mui/material";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { NavLink } from 'react-router-dom';



const Header = () => {
  const [value, setValue] = useState();

  return (
    <AppBar sx={{backgroundColor: "#232F3D"}} position="sticky">
      <Toolbar>
        <Typography>
          <LibraryBooksOutlinedIcon />
        </Typography>
              <Tabs
                  sx={{ml:"auto"}}
          textColor="inherit"
          indicatorColor="primary"
          value={value}
          onChange={(e, val) => setValue(val)}
        >
          <Tab LinkComponent={NavLink} to="/addBook" label="Add product" />
          <Tab LinkComponent={NavLink} to="/books" label="Books" />

          <Tab LinkComponent={NavLink} to='/about' label="About Us" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
