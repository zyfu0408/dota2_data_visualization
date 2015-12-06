Process Book: DOTA2 Visualization - The Frankfurt Major 2015 
===

Team Member and Related Link
---
######Lin Du, ldu@wpi.edu, LinsanityDu  
######Zhongyuan Fu, zyfu0408@gmail.com, zyfu0408
######Jifeng Kou,jkou@wpi.edu,JifengKou

[Github Repo Link](https://github.com/datavisfordota2/datavisfordota2.github.io)

[Visualization Link (under construction)](http://datavisfordota2.github.io/)

Overview and Motivation
---
![dota2](img/dota2.jpg)
####<center>Figure 1. Dota2 poster by Valve</center>

Based on [Wikipedia](https://en.wikipedia.org/wiki/Dota_2), "**Dota2** is a multiplayer online battle arena viedo game. Dota 2 is played in matches involving two teams of five players, each of which occupies a stronghold at a corner of the map. Each stronghold contains a building called the "Ancient", which the opposite team must destroy to win the match. Each player controls a character called a "Hero", and focuses on leveling up, collecting gold, acquiring items, and fighting against the other team to achieve victory."

![dotamap](img/dotamap.jpg)
####<center>Figure 2. Dota2 Map. At each end of the map are the Radiant and Dire strongholds, called Ancients. Defending the Ancients are a series of Towers, drawn as squares.</center>

**Dota2** is not a simple game, actually, it is a sport which is the same as Football, basketball and baseball. To be a professional **Dota2** player, one should have the outstanding teamwork, smart strategy and fast reaction. Think about it, there are around 1 Million dota2 players in the world, only 90 players can stand on the best tournament. How did this happen? What special abilities do these 90 players have? Could we become one of them? That is very interesting to investigate.

Why do we want to focus on this game? First of all, we are true **dota2** fans. We played the game, we watched the game and we enjoyed the game. We want to see our favorite players statistics in this tournament like what we see in the NFL and NBA website. Secondly, I have never seen a visualization that can describe the whole information in a **dota2** tournament, especially for this undergoing tournament. Last but not the least, we would like to show **dota2** is not a easy game, it is actually involving a lot of interesting stories. The most important thing we learn during this class is that the core of data visulization is to tell the story inside the data.

Which tournament should we focus? Since there are many dota2 tournament every month. **Of course**, we want to see the most recent tournament! Actually, it is still undergoing! we choose the [**2015 Frankfurt major (Nov.16th - Nov. 21st)**](http://www.thefrankfurtmajor.com/). The Frankfurt Major (or "Fall Major") will be the first event of Valve's Dota Major Championships, which will add 3 new publisher-sponsored tournaments each year in addition to The International. The Main Event will take place at Festhalle Messe, a multi-purpose concert hall in Frankfurt, Germany with a total seating capacity of over 9,800. The prize pool of the tournament provided by Valve was set to **$3,000,000 USD**.

Related Work
---
Anything that inspired you, such as a paper, a web site, visualizations we discussed in class, etc.
In terms of the related website or visulizations, I will talk about some professional dota statistics website, such as [dotabuff](http://www.dotabuff.com/),[dotamax](http://dotamax.com/) and [gosugamer](http://www.gosugamers.net/dota2). Below is one example of the visulization from gosugamer.net.

![gosu](img/gosu.png)
####<center>Figure 3. The visualization of Hero statistics from gosugamer.net</center>


Data 
---

Data: Source, scraping method, cleanup, etc.

The source of data is from the following website:
[dotabuff](http://www.dotabuff.com/), [dotamax](http://dotamax.com/) and [datdota](http://www.datdota.com/)

For every dataset, we manually modify the Player ID and the team name based on their official website so that the lastest changes could be updated.

General Visualization Design
---

The main component of this visualization is that how we choose the focus of this tournament. Based on our proposal, We would like to focus on the team statistics, the player statistics and the hero statistics, just like the demonstration of below figure. Therefore, in the following sections, we will divide every question into three parts. 

![mainpage](img/mainpage.png)
####<center>Figure 4. Our main page design</center>

Questions
---
### Team Visualization

We are trying to show each hero’ performance during the Frankfurt Tournament in the hero page. The specific data for each hero covered including the draft part and the detailed part. For draft part, the data contains hero’s average ban/pick phase, average ban/pick position, ban/pick times and ban/pick rate. For the detailed part, the data covers hero’s appearance times, its win rate, the average level, the average GPM (gold per minute), the average XPM (experience per minute), and the average KDA ((kills + assists) / deaths). 

### Player Visualization

We are trying to show each player's performance and compare different players' performance in this tournament. We want to know which player is the strongest in this tournament. In terms of some new questions, since every player has his role in his team, such as Midlane, Carry and support, we want to visualize and compare players based on their own positions and using different criteria. A similar instance in basketball is that it seems unfair to compare the "block" statistics of a point guard and a center player. We want to choose the best criteria for different players.

### Hero Visualization

We are trying to show each hero’s performance during the Frankfurt Tournament in the hero page. The specific data for each hero covered including the draft part and the detailed part. For draft part, the data contains hero’s average ban/pick phase, average ban/pick position, ban/pick times and ban/pick rate. For the detailed part, the data covers hero’s appearance times, its win rate, the average level, the average GPM (gold per minute), the average XPM (experience per minute), and the average KDA ((kills + assists) / deaths). 

Exploratory Data Analysis
---

### Team Visualization


### Player Visualization

From the player data we have, at first, we want to use a big bar chart to compare the player's performance. However, we found the statistic from player to player is so different. Therefore, we decide to seperate player based on their roles in each team and generalize some universal parameters to compare different players. From this thought, we are considering to use a scatter plot to show each player in different statistics as a data point. In this scatter plot, we can easily see the player ranking on the basis of different criteria.

### Hero Visualization

In the hero view part, we use sortable diverging stacked bar chart to show how many games a hero loses and how many games a hero wins. The order of each stacked bar can be changed by the filter, which can be sorted by the hero name, the appearance times or the win rate. We also use kind of bipartite chart to show each hero’s detailed data. From the our visualizations, we find that there are about 10 - 15 heroes seem to be very strong in the current release edition, and these heroes have very high priority to be banned or picked in the games. However, when we check their win rate through the visualization, we find that the “strong” heroes do not perform better than others, and some of them even lose 55 to 60 percent of the games. 


Design Evolution
---
### Team Visualization

### Player Visualization

At first, we want to use a bubble chart to show the comparison of the players. However, we finally made our decision to use bar chart, which is more obvious and clearer. We think the bar chart is more professional after we reviewed some sports visulization website. The scatter plot is also inspired from some statistic website. Since there are a lot players in this tournament, we think we can represent each player as a point in the visulization and easily justify which player is better. 

### Hero Visualization

At the very beginning, we tried to use bar chart to show the win rate of each hero because we thought win rate is one of the most important data to show hero’s performance in a very direct way. After finished the visualization, we found several heroes’ win rate reach 100 percent and some of their win rates are 0. After we checked our data again, we found that these extreme data occurred because of their low appearance, most of which are less than 3. Thus, we realized that we cannot show the win rate separately without their appearance times. That is why we use the diverging stacked bar chart eventually instead of pure bar chart to show these kind of data. 

	
Implementation
---
### Team Visualization

### Player Visualization

For the player statistics comparison, we would like to use the bar chart to compare two players. The design is inspired by the nba statistic webpage. We think this design can directly show which player is better. Like the "Traditional", "advanced" in NBA statistics terms, we also have different statistics criteria, such as "basic", "damage made" and "misc". 
![com](img/compare.png)
####<center>Figure 5. NBA statistic website</center>

For the player ranking part, we would like to use the scatter plot to compare different players based on different criteria. For example, the x-axis can represent the gold earned per game for one player and the y-axis can represent the damage he made per game. In this plot, if one player can have the lower earned gold and the higher made damage, we can conclude this player is a high-rated player.
![scatter](img/scatter.png)
####<center>Figure 6. Scatter Plot Example</center>

### Hero Visualization

We use the bipartite chart to show the detailed data for each hero. The very left column contains the hero types, which is the strength hero, agility hero and the intelligence hero, and each type’s ban/pick times, which is shown by he height of the left rectangles. In the right side of chart, each hero’s ban/pick situation and its more detailed permanence will be shown when your mouse is over the specific hero row or its corresponding rectangle. 
![bar](img/bipartitle.png)
####<center>Figure 7. Bipartitle Example</center>


The combination of the horizontal axis at the top and the vertical 0 axis in the middle of the chart is showing how many games a hero loses and how many games a hero wins. The bar left to the vertical 0 axis represents the lose games and the bar right to the vertical 0 axis represents the win games. Each bar vertically stands for each hero, the order of which can be filtered by the hero name, the appearance times or the win rate.
![stack](img/stackbar.png)
####<center>Figure 8. Stackbar Example</center>


Evaluation
---

### Team Visualization


### Player Visualization
From the data visulization we have right now, we know that we cannot easily judge one player's performance by only one criteria. We should rank the player performance based on their role in his team. In terms of improving the visualization, we want to add a "Hall of Fame" section to see the record of this tournament. Personally I want to use a bubble chart to show these records, of course, we are trying to find a better visualization type to show them right now.  

### Hero Visualization
What we have done are trying to show the detailed performance of each hero in this tournament. In the future, we want to finish the comparison part,  which is trying to compare different heroes’ performance in a view. 

