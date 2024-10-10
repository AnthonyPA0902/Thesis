import React, { useEffect } from 'react';

const Footer = () => {
    useEffect(() => {
        const loadScript = (src, callback) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = callback;
            document.head.appendChild(script);
        };

        loadScript('/admin_assets/js/jquery-3.2.1.min.js', () => {
            loadScript('/admin_assets/js/popper.min.js', () => {
                loadScript('/admin_assets/js/bootstrap.min.js', () => {
                    loadScript('/admin_assets/js/jquery.slimscroll.js', () => {
                        loadScript('/admin_assets/js/app.js', () => {
                        });
                    });
                });
            });
        });
    }, []);
    return (
        <div className="notification-box">
            <div className="msg-sidebar notifications msg-noti">
                <div className="topnav-dropdown-header">
                    <span>Messages</span>
                </div>
                <div className="drop-scroll msg-list-scroll" id="msg_list">
                    <ul className="list-box">
                        <li>
                            <a href="chat.html">
                                <div className="list-item">
                                    <div className="list-left">
                                        <span className="avatar">R</span>
                                    </div>
                                    <div className="list-body">
                                        <span className="message-author">Richard Miles </span>
                                        <span className="message-time">12:28 AM</span>
                                        <div className="clearfix"></div>
                                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="chat.html">
                                <div className="list-item new-message">
                                    <div className="list-left">
                                        <span className="avatar">J</span>
                                    </div>
                                    <div className="list-body">
                                        <span className="message-author">John Doe</span>
                                        <span className="message-time">1 Aug</span>
                                        <div className="clearfix"></div>
                                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="chat.html">
                                <div className="list-item">
                                    <div className="list-left">
                                        <span className="avatar">T</span>
                                    </div>
                                    <div className="list-body">
                                        <span className="message-author"> Tarah Shropshire </span>
                                        <span className="message-time">12:28 AM</span>
                                        <div className="clearfix"></div>
                                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="chat.html">
                                <div className="list-item">
                                    <div className="list-left">
                                        <span className="avatar">M</span>
                                    </div>
                                    <div className="list-body">
                                        <span className="message-author">Mike Litorus</span>
                                        <span className="message-time">12:28 AM</span>
                                        <div className="clearfix"></div>
                                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="chat.html">
                                <div className="list-item">
                                    <div className="list-left">
                                        <span className="avatar">C</span>
                                    </div>
                                    <div className="list-body">
                                        <span className="message-author"> Catherine Manseau </span>
                                        <span className="message-time">12:28 AM</span>
                                        <div className="clearfix"></div>
                                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="chat.html">
                                <div className="list-item">
                                    <div className="list-left">
                                        <span className="avatar">D</span>
                                    </div>
                                    <div className="list-body">
                                        <span className="message-author"> Domenic Houston </span>
                                        <span className="message-time">12:28 AM</span>
                                        <div className="clearfix"></div>
                                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="chat.html">
                                <div className="list-item">
                                    <div className="list-left">
                                        <span className="avatar">B</span>
                                    </div>
                                    <div className="list-body">
                                        <span className="message-author"> Buster Wigton </span>
                                        <span className="message-time">12:28 AM</span>
                                        <div className="clearfix"></div>
                                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="chat.html">
                                <div className="list-item">
                                    <div className="list-left">
                                        <span className="avatar">R</span>
                                    </div>
                                    <div className="list-body">
                                        <span className="message-author"> Rolland Webber </span>
                                        <span className="message-time">12:28 AM</span>
                                        <div className="clearfix"></div>
                                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="chat.html">
                                <div className="list-item">
                                    <div className="list-left">
                                        <span className="avatar">C</span>
                                    </div>
                                    <div className="list-body">
                                        <span className="message-author"> Claire Mapes </span>
                                        <span className="message-time">12:28 AM</span>
                                        <div className="clearfix"></div>
                                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="chat.html">
                                <div className="list-item">
                                    <div className="list-left">
                                        <span className="avatar">M</span>
                                    </div>
                                    <div className="list-body">
                                        <span className="message-author">Melita Faucher</span>
                                        <span className="message-time">12:28 AM</span>
                                        <div className="clearfix"></div>
                                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="chat.html">
                                <div className="list-item">
                                    <div className="list-left">
                                        <span className="avatar">J</span>
                                    </div>
                                    <div className="list-body">
                                        <span className="message-author">Jeffery Lalor</span>
                                        <span className="message-time">12:28 AM</span>
                                        <div className="clearfix"></div>
                                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="chat.html">
                                <div className="list-item">
                                    <div className="list-left">
                                        <span className="avatar">L</span>
                                    </div>
                                    <div className="list-body">
                                        <span className="message-author">Loren Gatlin</span>
                                        <span className="message-time">12:28 AM</span>
                                        <div className="clearfix"></div>
                                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="chat.html">
                                <div className="list-item">
                                    <div className="list-left">
                                        <span className="avatar">T</span>
                                    </div>
                                    <div className="list-body">
                                        <span className="message-author">Tarah Shropshire</span>
                                        <span className="message-time">12:28 AM</span>
                                        <div className="clearfix"></div>
                                        <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="topnav-dropdown-footer">
                    <a href="chat.html">See all messages</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;