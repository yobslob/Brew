import React, { useEffect, useState } from 'react';
import './mainContent.css';

const MainContent = () => {
    const [articles, setArticles] = useState({
        foryou: [],
        following: [],
        technology: [],
        health: [],
        science: []
    });
    const [selectedTab, setSelectedTab] = useState('foryou');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/blogs');
                const categorizedArticles = await response.json();

                const allArticles = Object.values(categorizedArticles).flat();
                const user = JSON.parse(localStorage.getItem("user"));
                const userName = user ? user.name : null;

                const userArticles = allArticles.filter(article => article.author === userName);
                const halfCount = Math.floor(allArticles.length / 2);
                const forYouArticles = [...userArticles, ...allArticles.slice(0, halfCount)];

                const randomSelection = (arr, count) => {
                    const shuffled = [...arr].sort(() => 0.5 - Math.random());
                    return shuffled.slice(0, count);
                };

                const followingArticles = randomSelection(allArticles, 10);

                setArticles({
                    foryou: forYouArticles,
                    following: followingArticles,
                    technology: categorizedArticles.technology || [],
                    health: categorizedArticles.health || [],
                    science: categorizedArticles.science || [],
                });
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);

    const tabs = [
        { id: 'foryou', label: 'For You' },
        { id: 'following', label: 'Following' },
        { id: 'technology', label: 'Technology' },
        { id: 'health', label: 'Health' },
        { id: 'science', label: 'Science' },
    ];

    return (
        <div className="main-content">
            <nav className="nav-tabs">
                <button onClick={() => window.location.href = '/topics'} className="nav-item">
                    <i className="add-icon">+</i>
                </button>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`nav-item ${selectedTab === tab.id ? 'active' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>

            <div className="blogs-container">
                <ArticleCards
                    category={selectedTab}
                    articles={articles[selectedTab]}
                    setArticles={setArticles}
                    selectedTab={selectedTab}
                />
            </div>
        </div>
    );
};

const ArticleCards = ({ category, articles, setArticles, selectedTab }) => {
    const [dropdownVisibleIndex, setDropdownVisibleIndex] = useState(null);

    const handleDropdownToggle = (index) => {
        setDropdownVisibleIndex(dropdownVisibleIndex === index ? null : index);
    };

    const handleSave = (title) => {
        console.log("Saved:", title);
        setDropdownVisibleIndex(null);
    };

    const handleDelete = async (id, title) => {
        try {
            const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log("Deleted:", title);
                setArticles(prevArticles => ({
                    ...prevArticles,
                    [selectedTab]: prevArticles[selectedTab].filter(article => article._id !== id),
                }));
            } else {
                console.error("Failed to delete the article:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting article:", error);
        } finally {
            setDropdownVisibleIndex(null);
        }
    };

    return (
        <main className="main-content">
            <section className="articles-section">
                {articles.length === 0 ? (
                    <p>No articles available.</p>
                ) : (
                    articles.map((article, index) => (
                        <div className="article-card" key={index}>
                            <h2 className="article-title">{article.title}</h2>
                            <p className="article-author">By {article.author} on {new Date(article.date).toLocaleDateString()}</p>
                            <div className="article-actions">
                                <span className="likes-icon">❤️ {article.likes}</span>
                                <span className="comments-icon">💬 {article.comments}</span>
                                <button className="three-dot-button" onClick={() => handleDropdownToggle(index)}>⋯</button>
                                {dropdownVisibleIndex === index && (
                                    <div className="dropdown-menu">
                                        <button onClick={() => handleSave(article.title)}>Save</button>
                                        <button onClick={() => handleDelete(article._id, article.title)}>Delete</button>
                                    </div>
                                )}
                            </div>
                            <p className="article-content">{article.content} <a href={article.link} className="read-more-link">Read more</a></p>
                        </div>
                    ))
                )}
            </section>
        </main>
    );
};

export default MainContent;
