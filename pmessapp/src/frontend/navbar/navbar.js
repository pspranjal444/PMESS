import React, { Component } from 'react';

class AdminNavbar extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            // <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            //     <img src="https://s-vlabs.com/wp-content/themes/mobilefirst/images/logo@2x.png" height="50px"/>
            //     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            //         <span class="navbar-toggler-icon"></span>
            //     </button>
            //     <div class="collapse navbar-collapse" id="navbarNavDropdown">
            //         <ul class="navbar-nav">
            //             <li class="nav-item active">
            //                 <a class="nav-link" href="#">Add Equipment <span class="sr-only">(current)</span></a>
            //             </li>
            //             <li class="nav-item">
            //                 <a class="nav-link" href="#">Schedule</a>
            //             </li>
            //             <li class="nav-item">
            //                 <a class="nav-link" href="#">View/Edit PM's</a>
            //             </li>
            //             <li class="nav-item">
            //                 <a class="nav-link" href="#">Reports</a>
            //             </li>
            //         </ul>
            //     </div>
            // </nav>

            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <img src="https://s-vlabs.com/wp-content/themes/mobilefirst/images/logo@2x.png" height="50px" />
                    </div>
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li><a href="/addequipment">Add Equipment <span class="sr-only">(current)</span></a></li>
                            <li><a href="#">Schedule</a></li>
                            <li><a href="#">View/Edits PM's</a></li>
                            <li><a href="#">Reports</a></li>
                        </ul>

                    </div>
                </div>
            </nav>
        );
    }
}

export default AdminNavbar;