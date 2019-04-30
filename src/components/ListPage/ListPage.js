import React from 'react';

export default class ListPage extends React.Component {
  render() {
    return (
     <>
      <nav role="navigation">
       <a href="#">Home</a>
       <a href="#">Log out</a>
      </nav>
      <main role="main">
        <header role="banner">
          <h1>Page List</h1>
          <h2>Ordering by most recent edit</h2>
          <h3><a href="#">(change)</a></h3>
        </header>
        <section>
         <ul>
          <li>
           <a href="#">Peaches</a><button>Edit</ button><button>Delete</button>
          </li>
          <li>
            <a href="#">New Page 4/23/2019 4:02 PM</a><button>Edit</button><button>Delete</button>
          </li>
          <li>
            <a href="#">Apples</a><button>Edit</button><button>Delete</button>
          </li>
          <li>
            <a href="#">Personal Home Page</a><button>Edit</button><button>Delete</button>
          </li>
        </ul>
        </section>
      </main>
   </>
    );
  }
}